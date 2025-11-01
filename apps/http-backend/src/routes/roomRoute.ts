import express, { Router } from "express";
import { decodeToken } from "../middleware/decodeToken";
import { createRoom, getChats, getRoomId, getRooms } from "../controllers/roomController";

export const roomRouter:Router=express.Router();

roomRouter.get('/',decodeToken,getRooms);
roomRouter.post('/create',decodeToken,createRoom);
roomRouter.get('/chats/:roomId',decodeToken,getChats);
roomRouter.post('/:slug',decodeToken,getRoomId);