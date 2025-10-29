import { RefObject } from "react";
import { type shape } from "../components/Canvas";
import { getExistingMessages } from "./http";
interface RectType {
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
}
interface CircleType {
  type: "circle";
  centerX: number;
  centerY: number;
  radius: number;
}
type Shape = CircleType | RectType;

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private roomId;
  private clicked:boolean=false;
  private startX=0;
  private startY=0;
  private centerX=0;
  private centerY=0;
  private radius=0;
  private selectedTool:shape='rect';
  private socket;
  
  constructor(canvas: HTMLCanvasElement, roomId: string, socketRef: RefObject<WebSocket|null>) {
    this.canvas = canvas;
    this.roomId = roomId;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.init();
    this.socket = socketRef.current;
    this.initMouseHandlers();
    this.initHandlers();
  }
  setTool(selectedTool:shape){
    this.selectedTool=selectedTool;
  }
  async init() {
    this.existingShapes = await getExistingMessages(this.roomId);
    this.paintCanvas();
  }

  initHandlers() {
    if(!this.socket){
      return;
    }
    this.socket.onmessage = (event) => {
      console.log(event.data);
      const messageObj = JSON.parse(event.data);
      const shape = messageObj.message;
      if (shape.type === "rect") {
        this.existingShapes.push({
          type: shape.type,
          x: shape.x,
          y: shape.y,
          height: shape.height,
          width: shape.width,
        });
      } else {
        this.existingShapes.push({
          type: shape.type,
          centerX: shape.centerX,
          centerY: shape.centerY,
          radius: shape.radius,
        });
      }
      this.paintCanvas();
    };
  }
    handleMouseDown=(e:MouseEvent)=>{
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.clicked = true;
  }

    handleMouseMove=(e:MouseEvent)=>{
        if (!this.clicked) {
        return;
        }
        const width = (e.clientX - this.startX);
        const height = (e.clientY - this.startY);
        this.paintCanvas();
        if(this.selectedTool==='rect'){
            this.ctx.strokeRect(this.startX,this.startY,width,height);
        }else{
        this.centerX=this.startX+width/2;
        this.centerY=this.startY+height/2;
        this.ctx.beginPath();
        this.radius=Math.sqrt((width**2)+(height**2))/2;
        this.ctx.arc(this.centerX,this.centerY,this.radius,0,2*Math.PI);
        this.ctx.stroke();
        }
  }

  
    handleMouseUp=(e:MouseEvent)=>{
      if(!this.socket)return;
        this.clicked = false;
        const width=e.clientX-this.startX;
        const height=e.clientY-this.startY;
        if(this.selectedTool==='circle'){
        this.radius=Math.sqrt((width**2)+(height**2))/2;
        }
        if(this.selectedTool==='circle'){
        this.socket.send(JSON.stringify({
            type:"chat",
            roomId:this.roomId,
            message:{
            type:'circle',
            centerX:this.centerX,
            centerY:this.centerY,
            radius:this.radius
        }
        }))
        }
        if(this.selectedTool==='rect'){
        this.socket.send(JSON.stringify({
        type:"chat",
        roomId:this.roomId,
        message:{
            type:'rect',
            x:this.startX,
            y:this.startY,
            height,
            width
        }
        }))
        }    
    }

  initMouseHandlers(){
    this.canvas.addEventListener("mouseup", this.handleMouseUp);
    this.canvas.addEventListener("mousedown",this.handleMouseDown);
    this.canvas.addEventListener("mousemove",this.handleMouseMove);
  }

  paintCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.existingShapes.map((shape: Shape) => {
      if (shape.type === "rect") {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else {
        this.ctx.strokeStyle='red'
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          shape.radius,
          0,
          2 * Math.PI
        );
        this.ctx.stroke();
        this.ctx.closePath();
      }
    });
  }

  destroy(){
    this.canvas.removeEventListener('mouseup',this.handleMouseUp);
    this.canvas.removeEventListener('mousemove',this.handleMouseMove);
    this.canvas.removeEventListener('mousedown',this.handleMouseDown);
    this.socket?.removeEventListener('message',this.initHandlers);
  }
}
