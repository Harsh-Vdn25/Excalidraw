import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { requiredInfo } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 5001 });

interface User {
  socket: WebSocket;
  rooms: String[];
  userId: String;
}

const users: User[] = [];
function CheckUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, requiredInfo.JWT_SECRET);
    if (typeof decoded == "string") {
      return null;
    }
    if (!decoded || !decoded.id) {
      return null;
    }
    return decoded.id;
  } catch (err) {
    return null;
  }
}

wss.on("connection", (socket, request) => {
  const url = request.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("Token") || "";
  const userId = CheckUser(token);
  console.log(userId);
  if (!userId) {
    socket.close();
    return;
  }
  socket.send(JSON.stringify("Joined"))
  users.push({
    socket,
    rooms: [],
    userId,
  });
  socket.on("message", async(data: string) => {
    const parsedData = JSON.parse(data);
    if (parsedData?.type === "join_room") {
      const user = users.find((x) => x.socket === socket);
      user?.rooms.push(parsedData.roomId);
    }
    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.socket === socket);
      if (!user) {
        return;
      }
      user.rooms = user.rooms.filter((room) => room !== parsedData.roomId);
    }
    if (parsedData.type === "chat") {
      const { roomId, message } = parsedData; //message checks
      const Strmessage=JSON.stringify(message);
      await prismaClient.chat.create({
        data: {
          roomId: Number(roomId),
          message:Strmessage,
          sentBy:userId
        }
      });
      users.forEach((userObj) => {
        if (userObj.rooms.includes(roomId)) {
          userObj.socket.send(
            JSON.stringify({
              message: message,
              roomId,
            })
          );
        }
      });
    }
  });
  socket.on("close", () => {
    console.log("socket closed");
  });
});
