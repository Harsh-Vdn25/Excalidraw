"use client";
import { useRef, useEffect, useState, type RefObject, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Game } from "./Game";
import { CircleIcon, PencilIcon, SquareIcon } from "lucide-react";

export type shape = "rect" | "circle" | "pencil";
export default function CanvasPage({ roomId }: { roomId: number }) {
  const canvasRef = useRef(null);
  const socketRef: RefObject<WebSocket | null> = useRef(null);
  const [selectedTool, setSelectedTool] = useState<shape>("rect");
  const [game, setGame] = useState<Game>();
  const authcontext = useContext(AuthContext);
  if (!authcontext) {
    throw new Error("");
  }
  const { Token } = authcontext;
  const wsURL = process.env.NEXT_PUBLIC_WSURL;

  if (!wsURL) {
    throw new Error("Missing NEXT_PUBLIC_APIURL in environment");
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    const ws = new WebSocket(
      `${wsURL}?Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmNWQ4YzI2Ny1lYmZlLTQ5YWUtYjVkNy1iYWU0NDg3ZmIxY2MiLCJpYXQiOjE3NjE5MzMxNzl9.fVGajRu478MTV_W9VM2xhAtc7TO4h7_SrJTURM0hwzM`
    );
    socketRef.current = ws;
    const socket = socketRef.current;
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "join-room",
          roomId: roomId,
        })
      );
    };
    const g = new Game(canvasRef.current, roomId, socketRef);
    setGame(g);
    return () => {
      g.destroy();
    };
  }, [canvasRef]);

  useEffect(() => {
    game?.setTool(selectedTool);
  }, [selectedTool]);
  return (
    <div className="w-screen h-screen bg-white">
      <canvas
        ref={canvasRef}
        width={900}
        height={600}
        className="bg-black relative"
      ></canvas>
      <div className="absolute top-2 left-2 p-3 flex gap-3 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-200">
        {/* Circle Tool */}
        <CircleIcon
          size={32}
          strokeWidth={2.5}
          onClick={() => setSelectedTool("circle")}
          className={`p-1 rounded-full cursor-pointer transition-all duration-200 
      ${
        selectedTool === "circle"
          ? "bg-red-100 border-2 border-red-500"
          : "border border-gray-400 hover:border-red-400 hover:bg-red-50"
      }`}
          stroke="red"
        />

        <SquareIcon
          size={32}
          strokeWidth={2.5}
          onClick={() => setSelectedTool("rect")}
          className={`p-1 rounded-full cursor-pointer transition-all duration-200 
      ${
        selectedTool === "rect"
          ? "bg-blue-100 border-2 border-blue-500"
          : "border border-gray-400 hover:border-blue-400 hover:bg-blue-50"
      }`}
          stroke="blue"
        />

        <PencilIcon
          size={32}
          strokeWidth={2.5}
          onClick={() => {
            setSelectedTool("pencil");
            console.log("pencil");
          }}
          className={`p-1 rounded-full cursor-pointer transition-all duration-200 
      ${
        selectedTool === "pencil"
          ? "bg-green-100 border-2 border-green-500"
          : "border border-gray-400 hover:border-green-400 hover:bg-green-50"
      }`}
          stroke="green"
        />
      </div>
    </div>
  );
}
