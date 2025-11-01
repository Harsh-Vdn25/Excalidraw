import { WebSocketServer, WebSocket } from "ws";
import { credentials } from "@repo/backend-common/config";
import { verifyToken } from "@repo/backend-common/verifyToken";
import { IPCheck } from "./helper/IPCheck";
import { prismaClient } from "@repo/db/client";

const port = Number(credentials.WS_PORT);
if (!port) {
  throw new Error("No port name specified");
}
interface User {
  socket: WebSocket;
  rooms: Number[];
  userId: String;
}

const users: User[] = [];
const wss = new WebSocketServer({ port: port });
wss.on("connection", (socket, request) => {
  const url = request.url;
  if (!url) return;
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("Token");
  if (!token) return;
  const userId = verifyToken(token);

  if (!userId) {
    socket.close();
  }

  socket.on("message", async (data: string) => {
    const parsedData = IPCheck(data);
    if (!parsedData) {
      return socket.send(JSON.stringify({ message: "Invalid message type" }));
    }
    if (parsedData.type == "join-room") {
      const roomId = parsedData.roomId;
      let isPresent=false;
      users.forEach((sObj) => {
        if (sObj.socket === socket) {
          sObj.rooms.push(roomId);
          isPresent=true;
        }
      });
      if(!isPresent){
        users.push({
          socket:socket,
          rooms:[roomId],
          userId:userId
        })
      }
      socket.send(JSON.stringify("joined-room"))
    }
    if (parsedData.type === "draw") {
      const { shapeObj, roomId } = parsedData;
      const shape=JSON.stringify(shapeObj);
      for (const sObj of users) {
        if (sObj.socket === socket) {
          if (!sObj.rooms.includes(roomId)) {
            return socket.send(JSON.stringify({message:"Join the room"}));
          }
          break;
        }
      }
      const isSent = await prismaClient.shape.create({
        data: {
          shape,
          roomId,
          userId,
        },
      });
      
      if (!isSent) return;
      users.forEach((sObj) => {
        if (sObj.rooms.includes(roomId)) {
          sObj.socket.send(
            JSON.stringify({
              shape: shape,
              roomId: roomId,
            })
          );
        }
      });
    }
  });
  socket.onclose = () => {
    users.forEach((sObj, index) => {
      if (sObj.socket === socket) {
        users.splice(index, 1);
      }
    });
  };
});
