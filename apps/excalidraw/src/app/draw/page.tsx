"use client"
import axios from "axios";
import { BACKEND_URL } from "../../../config";
interface RectType{
    type:"rect";
    x:number;
    y:number;
    width:number;
    height:number;
}
interface CircleType{
    type:"circle";
    centerX:number;
    centerY:number;
    radius:number;
}
type Shape=CircleType|RectType;
interface initDrawIpType{
  canvas:HTMLCanvasElement;
  roomId:string;
  socket:WebSocket;
  shapeType:'circle'|'rect';
}

export default async function initDraw({canvas,roomId,socket,shapeType}:initDrawIpType) {

  const ctx=canvas.getContext('2d')
  let existingShapes:Shape[]=await getExistingMessages(roomId);
  if(!ctx)return;
  paintCanvas(existingShapes,canvas,ctx);
  let startX = 0;
  let startY = 0;
  let clicked = false;
  let radius=0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const handleMouseUp=(e:MouseEvent)=>{
    clicked = false;
    const width=e.clientX-startX;
    const height=e.clientY-startY;
    if(shapeType==='circle'){
      radius=Math.sqrt((width**2)+(height**2))/2;
    }
    if(shapeType==='circle'){
      const centerX=startX+width/2;
      const centerY=startY+height/2;
      socket.send(JSON.stringify({
        type:"chat",
      roomId:roomId,
      message:{
        type:'circle',
        centerX:startX,
        centerY:startY,
        radius:radius
      }
      }))
    }
    if(shapeType==='rect'){
      socket.send(JSON.stringify({
      type:"chat",
      roomId:roomId,
      message:{
        type:'rect',
        x:startX,
        y:startY,
        height,
        width
      }
    }))
    }
    socket.onmessage=(event)=>{
      const messageObj=JSON.parse(event.data)
      const shape=messageObj.message;
      if(shape.type==='rect'){
        existingShapes.push({
        type:shape.type,
        x:shape.x,
        y:shape.y,
        height:shape.height,
        width:shape.width
    })
      }else{
        existingShapes.push({
        type:shape.type,
        centerX:shape.centerX,
        centerY:shape.centerY,
        radius:shape.radius
    })
      }
      paintCanvas(existingShapes,canvas,ctx);
    }
  }
  const handleMouseDown=(e:MouseEvent)=>{
    startX = e.clientX;
    startY = e.clientY;
    clicked = true;
  }
  const handleMouseMove=(e:MouseEvent)=>{
    if (!clicked) {
      return;
    }
    const width = (e.clientX - startX);
    const height = (e.clientY - startY);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "white";
    paintCanvas(existingShapes,canvas,ctx);
    if(shapeType==='rect'){
            ctx.strokeRect(startX,startY,width,height);
    }else{
      ctx.strokeStyle = "white";
      const centerX=startX+width/2;
      const centerY=startY+height/2;
      ctx.beginPath();
      radius=Math.sqrt((width**2)+(height**2))/2;
      ctx.arc(centerX,centerY,radius,0,2*Math.PI);
      ctx.stroke();
    }
  }

  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousedown",handleMouseDown);
  canvas.addEventListener("mousemove",handleMouseMove);

  return ()=>{
    canvas.removeEventListener('mouseup',handleMouseUp);
    canvas.removeEventListener('mousemove',handleMouseMove);
    canvas.removeEventListener('mousedown',handleMouseDown);
  }
}

function paintCanvas(existingShapes:Shape[],canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "white";
    existingShapes.map((shape:Shape)=>{
        if(shape.type==='rect'){
            ctx.strokeRect(shape.x,shape.y,shape.width,shape.height);
        }else{
          ctx.beginPath();
          ctx.arc(shape.centerX,shape.centerY,shape.radius,0,2*Math.PI);
          ctx.stroke();
        }
    })
}

async function getExistingMessages(roomId:string){
  try{
    const response=await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    const data=response.data;
    let shape;
    const shapes=data.map((x:{message:string})=>{
      shape=x.message
      return JSON.parse(shape)
    })
    return shapes;
  }catch(err){
    return [];
  }
}