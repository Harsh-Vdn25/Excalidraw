"use client";

import { useEffect, useRef } from "react";
import initDraw from "../draw/page";
import { WS_URL } from "../../../config";

export type shape = "rect" | "circle";
export default function CanvasPage({ roomId }: { roomId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

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
      await initDraw(canvas, roomId,socket);
    };

    setup();
  }, [roomId]);

  if (!socketRef) {
    return <div>Connecting to server....</div>;
  }
  return (
    <div className="w-screen h-screen bg-gray-100 ">
      <canvas ref={canvasRef} width={1070} height={700} />
    </div>
  );
}
