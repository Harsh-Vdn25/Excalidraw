import { RefObject } from "react";
import { getExistingMessages } from "./http";
import { shape } from "./page";
interface RectType {
  type: "rect";
  startX: number;
  startY: number;
  width: number;
  height: number;
}
interface CircleType {
  type: "circle";
  centerX: number;
  centerY: number;
  radius: number;
}
type shapeType = RectType | CircleType;

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: shapeType[];
  private roomId;
  private clicked: boolean = false;
  private startX = 0;
  private startY = 0;
  private centerX = 0;
  private centerY = 0;
  private radius = 0;
  private selectedTool: shape = "rect";
  private socket;
  constructor(
    canvas: HTMLCanvasElement,
    roomId: number,
    socketRef: RefObject<WebSocket | null>,
    selectedTool: string
  ) {
    this.canvas = canvas;
    this.roomId = roomId;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.init();
    this.socket = socketRef.current;
    this.initMouseHandlers();
    this.initHandlers();
  }
    init=async()=> {
    const shapes = await getExistingMessages(this.roomId);
    this.existingShapes = shapes;
    this.paintCanvas();
  }
  setTool=(selectedTool: shape)=> {
    this.selectedTool = selectedTool;
  }

  initHandlers=()=> {
    if(!this.socket)return;
    this.socket.onmessage=(e)=>{
        if(e.data==='joined-room')return;
        const shapeObj=JSON.parse(e.data)
        if(!shapeObj.shape)return;
        const shapeData=JSON.parse(shapeObj.shape)
        this.existingShapes.push(shapeData);
        this.paintCanvas();
    }
  }
  initMouseHandlers=()=>{
    this.canvas.addEventListener("mousedown", this.handleMouseDown);
    this.canvas.addEventListener("mousemove", this.handleMousemove);
    this.canvas.addEventListener("mouseup", this.handleMouseUp);
  }
  handleMouseDown=(e: MouseEvent)=> {
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.clicked = true;
  }
  handleMousemove=(e: MouseEvent)=> {
    if (!this.clicked) return;
    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;
    this.paintCanvas();
    if (this.selectedTool === "rect") {
      this.ctx.strokeRect(this.startX, this.startY, width, height);
    }
    if (this.selectedTool === "circle") {
      this.calculateCircleParams(width,height);
      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
      this.ctx.closePath();
    }
  }
  handleMouseUp=(e: MouseEvent)=> {
    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;
    this.clicked=false;
    if (this.selectedTool === "rect") {
        this.socket?.send(JSON.stringify({
            type: "draw",
          roomId: this.roomId,
          shapeObj: {
            type: "rect",
            startX: this.startX,
            startY: this.startY,
            width: width,
            height:height
          },
        }))
    }
    if (this.selectedTool === "circle") {
      this.socket?.send(
        JSON.stringify({
          type: "draw",
          roomId: this.roomId,
          shapeObj: {
            type: "circle",
            centerX: this.centerX,
            centerY: this.centerY,
            radius: this.radius,
          },
        }));
    }
    this.paintCanvas();
  }
  
  paintCanvas=()=> {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.existingShapes.map((shape:shapeType,index)=>{
        if (shape.type === "rect") {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
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
    })
  }

  destroy=()=> {
    this.canvas.removeEventListener("mousedown", this.handleMouseDown);
    this.canvas.removeEventListener("mousemove", this.handleMousemove);
    this.canvas.removeEventListener("mouseup", this.handleMouseUp);
    this.socket?.removeEventListener("message",this.initHandlers);
  }

  calculateCircleParams=(width:number,height:number)=>{
      this.centerX = this.startX + width / 2;
      this.centerY = this.startY + height / 2;
      this.radius = Math.sqrt(width ** 2 + height ** 2) / 2;
  }
}
