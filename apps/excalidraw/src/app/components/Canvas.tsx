"use client";

import { useEffect, useRef,useContext } from "react";
import { ShapeContext } from "../context/ShapeContext";
import initDraw from "../draw/page";
import { WS_URL } from "../../../config";
import { CircleIcon } from "@repo/ui/CircleIcon";
import { SquareIcon } from "@repo/ui/SquareIcon";
export type shape = "rect" | "circle";
export default function CanvasPage({ roomId }: { roomId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const context=useContext(ShapeContext);
  if(!context){
    throw new Error('')
  }
  const {shapeType,setShapeType}=context;
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ws = new WebSocket(WS_URL);
    socketRef.current = ws;
    const socket = socketRef.current;
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: roomId,
        })
      );
    };
    const setup = async () => {
      await initDraw({canvas, roomId,socket});
    };

    setup();
  }, [roomId]);

  if (!socketRef) {
    return <div>Connecting to server....</div>;
  }
  return (
    <div className="relative w-screen h-screen bg-gray-100">
  <canvas ref={canvasRef} width={1070} height={900} />

  <div className="absolute top-4 left-4 flex items-center gap-2 bg-white shadow-md rounded-lg p-1 border border-gray-200">
    <button
      onClick={() => {setShapeType("circle")}}
      className={`p-2 rounded hover:bg-gray-100 transition ${
        shapeType === "circle" ? "bg-blue-100 ring-2 ring-blue-400" : ""
      }`}
      title="Draw Circle"
    >
      <CircleIcon />
    </button>
    <button
      onClick={() => setShapeType("rect")}
      className={`p-2 rounded hover:bg-gray-100 transition ${
        shapeType === "rect" ? "bg-blue-100 ring-2 ring-blue-400" : ""
      }`}
      title="Draw Rectangle"
    >
      <SquareIcon />
    </button>
  </div>
</div>

  );
}
