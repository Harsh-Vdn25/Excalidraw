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
interface CoordinateType{
  x:number;
  y:number;
}
interface PencilType{
  type:"pencil",
  coordinates:CoordinateType[];
}

type shapeType = RectType | CircleType|PencilType;

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
  private points:CoordinateType[]=[];
  private pointSize=3;
  private viewportTransformation={
    x:0,
    y:0,
    scale:1
  }
  constructor(
    canvas: HTMLCanvasElement,
    roomId: number,
    socketRef: RefObject<WebSocket | null>
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
    this.canvas.removeEventListener('wheel',this.updateZooming);
    this.viewportTransformation={
      x:0,
      y:0,
      scale:1
    }
    this.selectedTool = selectedTool;
    if(this.selectedTool==='zoomIn'||this.selectedTool==='zoomOut'){
      this.canvas.addEventListener('wheel',this.updateZooming);
    }
  }

  reDraw(){
    this.paintCanvas();
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

  updateZooming=(e:WheelEvent)=>{
    const oldX=this.viewportTransformation.x;
    const oldY=this.viewportTransformation.y;
    const oldScale=this.viewportTransformation.scale;

    const localX=e.clientX;
    const localY=e.clientY;

    const newScale=(this.viewportTransformation.scale+=e.deltaY);

    const newX=localX-(localX-oldX)*(newScale/oldScale);
    const newY=localY-(localY-oldY)*(newScale/oldScale);

    this.viewportTransformation.x=newX;
    this.viewportTransformation.y=newY;
    this.viewportTransformation.scale=newScale;
    this.paintCanvas();
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
      this.ctx.stroke();
      this.ctx.closePath();
    }
    if(this.selectedTool==='pencil'){
      const x=e.clientX;
      const y=e.clientY;
      this.points.push({x,y})
      this.ctx.fillStyle='green';
      this.points.map((point)=>{
        this.ctx.beginPath();
        this.ctx.arc(point.x,point.y,this.pointSize,0,2*Math.PI,true);
        this.ctx.fill();
        console.log(point.x,point.y)
      })
    }
    if(this.selectedTool==='pan'){
       if(this.viewportTransformation.scale<=1) return; //Allowing panning the zoomed screen
        const dx = e.clientX - this.startX;
        const dy = e.clientY - this.startY;

        this.viewportTransformation.x += dx;
        this.viewportTransformation.y += dy;
        console.log(e.pageX,e.pageY)

        this.startX = e.clientX;
        this.startY = e.clientY;
      this.paintCanvas();
    }
  }
  handleMouseUp=(e: MouseEvent)=> {
    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;
    this.clicked=false;
    if(this.selectedTool==='pan')return;
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
    if(this.selectedTool === 'pencil'){
      this.socket?.send(JSON.stringify({
        type:"draw",
        roomId:this.roomId,
        shapeObj:{
          type:"pencil",
          coordinates:this.points
        }
      }))
      this.points=[];
    }
    this.paintCanvas();
  }
  
  paintCanvas=()=> {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "black";
    
    if(this.viewportTransformation.scale>=1){
      this.ctx.setTransform(1,0,0,1,0,0);
    this.ctx.setTransform(
        this.viewportTransformation.scale,
        0,
        0,
        this.viewportTransformation.scale,
        this.viewportTransformation.x,
        this.viewportTransformation.y
      );
    }
    this.existingShapes.map((shape:shapeType)=>{
        if (shape.type === "rect") {
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
      } else if(shape.type==='circle') {
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
      }else{
        this.ctx.fillStyle='green';
        shape.coordinates.map((point)=>{
        this.ctx.beginPath();
        this.ctx.arc(point.x,point.y,this.pointSize,0,2*Math.PI,true);
        this.ctx.fill();
      })
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