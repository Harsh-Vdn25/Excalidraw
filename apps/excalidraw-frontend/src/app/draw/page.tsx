"use client";
import { useRef, useEffect, useState,type RefObject, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Game } from "./Game";
import { CircleIcon, SquareIcon } from "lucide-react";

export type shape="rect"|"circle"
export default function CanvasPage({ roomId }: { roomId: number }) {
  const canvasRef = useRef(null);
  const socketRef:RefObject<WebSocket|null> = useRef(null);
  const [selectedTool, setSelectedTool] = useState<shape>("rect");
  const [game,setGame]=useState<Game>();
  const authcontext=useContext(AuthContext);
  if(!authcontext){
    throw new Error('')
  }
  const {Token}=authcontext;
  const wsURL = process.env.NEXT_PUBLIC_WSURL;

  if (!wsURL) {
    throw new Error("Missing NEXT_PUBLIC_APIURL in environment");
  }

  useEffect(() => {
    if(!canvasRef.current)return;
    const ws=new WebSocket(`${wsURL}?Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmNWQ4YzI2Ny1lYmZlLTQ5YWUtYjVkNy1iYWU0NDg3ZmIxY2MiLCJpYXQiOjE3NjE5MzMxNzl9.fVGajRu478MTV_W9VM2xhAtc7TO4h7_SrJTURM0hwzM`);
    socketRef.current=ws;
    const socket=socketRef.current;
    socket.onopen=()=>{
      socket.send(JSON.stringify({
        type:'join-room',
        roomId:roomId
    }))
    }
    const g=new Game(canvasRef.current,roomId,socketRef,selectedTool);
    setGame(g);
    return ()=>{
      g.destroy();
    }
  }, [canvasRef]);

  useEffect(()=>{
    game?.setTool(selectedTool);
  },[selectedTool])
  return (
    <div className="w-screen h-screen bg-white">
      <canvas
        ref={canvasRef}
        width={900}
        height={600}
        className="bg-black relative"
      ></canvas>
      <div className="absolute top-2 left-2 p-4 flex gap-2">
        <CircleIcon size={35} strokeWidth={3} 
        onClick={()=>setSelectedTool('circle')} 
        className="border-2 rounded-full border-gray-800 cursor-pointer" stroke="red" />

        <SquareIcon size={35} strokeWidth={3} 
        onClick={()=>setSelectedTool('circle')}
        className="border-2 rounded-full border-gray-800 cursor-pointer" stroke="blue" />
      </div>
    </div>
  );
}