"use client";
import { useEffect, useState, useRef } from "react";
import { WS_URL } from "../config";

export default function userSocket() {
  const [loading, setLoading] = useState(true);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    socketRef.current = ws;
    ws.onopen = () => {
      setLoading(false);
    };
    return () => {
      ws.close();
    };
  }, []);
  return {
    socketRef,
    loading,
  };
}
