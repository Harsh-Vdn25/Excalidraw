//rendered after the previous Chats are obtained
"use client";
import userSocket from "../hooks/userSocket";
import { useEffect, useState } from "react";

export default function ChatRoomClient({ roomId }: { roomId: string }) {
  const { socketRef, loading } = userSocket();
  const socket = socketRef.current;
  const [chats, setChats] = useState<{ message: string }[]>([]);
  const [currentMessage, setcurrentMessage] = useState("");

  function sendMessage() {
    if (!currentMessage) return;
    if(socket?.readyState===WebSocket.OPEN){
        socket.send(
        JSON.stringify({
          type: "chat",
          message: currentMessage,
          roomId: roomId,
        })
      );
    }
    setcurrentMessage('');
  }
  useEffect(() => {
    if (socket && !loading) {
        console.log(socket)
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: roomId,
        })
      );
      socket.onmessage=(event)=>{
        console.log(event)
        const parsedData=JSON.parse(event.data);
        setChats(prev=>[...prev,{message:parsedData.message}]);
      }
    }
  }, [socket, loading, roomId]);

  return (
    <div>
      {chats && chats.map((x,index) => <p key={index}>{x.message}</p>)}
      <div>
        <input
          type="text"
          placeholder="send message"
          value={currentMessage}
          onChange={(e) => setcurrentMessage(e.target.value)}
        />
        <button type="submit" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
