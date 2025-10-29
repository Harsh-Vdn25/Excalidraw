"use client"
import axios from "axios";
import { BACKEND_URL } from "../../../config";


interface initDrawIpType{
  canvas:HTMLCanvasElement;
  roomId:string;
  socket:WebSocket;
  shapeType:'circle'|'rect';
}

export default async function initDraw({canvas,roomId,socket,shapeType}:initDrawIpType) {


  
  

  
  return ()=>{
    
  }
}

