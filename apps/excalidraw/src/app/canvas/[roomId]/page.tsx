"use client";
import initDraw from "@/app/draw/page";
import { useState, useRef, useEffect } from "react";
export type shape = "rect" | "circle";
export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      initDraw(canvas);
    }
  }, [canvasRef]);
  return (
    <div className="w-screen h-screen bg-gray-100 ">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
      />
    </div>
  );
}
