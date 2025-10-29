"use client";

import { useEffect, useRef, useState } from "react";
import { WS_URL } from "../../../config";
import { CircleIcon } from "@repo/ui/CircleIcon";
import { SquareIcon } from "@repo/ui/SquareIcon";
import { Game } from "../draw/Game";
export type shape = "rect" | "circle";

interface windowSizeType{
  width:number|undefined;
  height:number|undefined
}
export default function CanvasPage({ roomId }: { roomId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const [selectedTool,setSelectedTool]=useState<shape>('rect');
  const [game,setGame]=useState<Game>();
  const [windowSize,setWindowSize]=useState<windowSizeType>({
    width: undefined,
    height:undefined
  })

  useEffect(()=>{
    if(!canvasRef.current)return;
    const canvas = canvasRef.current;
    const ws = new WebSocket(WS_URL);
    socketRef.current = ws;
    const socket = socketRef.current;
    socket.onopen = (e) => {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: roomId,
        })
      );
    };
    const g=new Game(canvas,roomId,socketRef);
    setGame(g);
    return ()=>{
      g.destroy();
    }
  },[canvasRef])

  useEffect(()=>{
    game?.setTool(selectedTool);
  },[selectedTool])

  useEffect(()=>{
    function handleResize(){
      setWindowSize({
        width:window.innerWidth,
        height:window.innerHeight
      })
    }
    window.addEventListener('resize',handleResize);
    return ()=>{
      window.removeEventListener('resize',handleResize);
    }
  },[])

  if (!socketRef) {
    return <div>Connecting to server....</div>;
  }
  return (
    <div className="relative w-screen h-screen bg-gray-100">
  <canvas ref={canvasRef} width={windowSize.width} height={windowSize.height} />

  <div className="absolute top-10 left-10 flex items-center gap-2 bg-white shadow-md rounded-lg p-1 border border-gray-400">
    <button
      onClick={() => {setSelectedTool("circle")}}
      className={`p-2 rounded hover:bg-gray-100 transition ${
        selectedTool === "circle" ? "bg-blue-100 ring-2 ring-blue-400" : ""
      }`}
      title="Draw Circle"
    >
      <CircleIcon />
    </button>
    <button
      onClick={() => setSelectedTool("rect")}
      className={`p-2 rounded hover:bg-gray-100 transition ${
        selectedTool === "rect" ? "bg-blue-100 ring-2 ring-blue-400" : ""
      }`}
      title="Draw Rectangle"
    >
      <SquareIcon />
    </button>
  </div>
</div>

  );
}
