"use client"
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { RefObject } from "react";

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
export default async function initDraw(canvas: HTMLCanvasElement,roomId:string,socket:WebSocket) {
  const ctx=canvas.getContext('2d')
  let existingShapes:Shape[]=await getExistingMessages(roomId);
  if(!ctx)return;
  paintCanvas(existingShapes,canvas,ctx);
  let startX = 0;
  let startY = 0;
  let clicked = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  canvas.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    startY = e.clientY;
    clicked = true;
  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const width=e.clientX-startX;
    const height=e.clientY-startY;
    existingShapes.push({
        type:'rect',
        x:startX,
        y:startY,
        height,
        width
    })
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
    socket.onmessage=(event)=>{
      paintCanvas(existingShapes,canvas,ctx);
    }
    
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!clicked) {
      return;
    }
    const width = (e.clientX - startX);
    const length = (e.clientY - startY);
    
    
    paintCanvas(existingShapes,canvas,ctx);
    ctx.strokeRect(startX, startY, width, length);
  });
}

function paintCanvas(existingShapes:Shape[],canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "white";
    existingShapes.map((shape:Shape)=>{
        if(shape.type==='rect'){
            ctx.strokeRect(shape.x,shape.y,shape.width,shape.height);
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