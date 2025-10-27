import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { requiredInfo } from '@repo/backend-common/config';
import { prismaClient } from "@repo/db/client";

export async function Signup(req: Request, res: Response) {
    const {username,password,name}=req.body;
  try {
    const hashedPassword=await bcrypt.hash(password,10);
    const response = await prismaClient.user.create({
      data: {
        username:username,
        password:hashedPassword,
        name:name,
      },
    });
    if(!response){
        return res.json({error:"Try again"})
    }
    const token = jwt.sign(
      {
        id: response.id,
      },
      requiredInfo.JWT_SECRET
    );
    res.status(200).json({
        message:"Successfully Signed up",
        token:token
    })
  } catch (err) {
    return res.json({error:err});
  }
}
export async function Signin(req: Request, res: Response) {
    const {username,password}=req.body;
  try{
    const response=await prismaClient.user.findUnique({
        where:{username},
    });
    if(!response){
        return res.status(404).json({message:"User doesn't exist"})
    }
    const isTrue=await bcrypt.compare(password,response?.password);
    if(!isTrue){
        return res.status(400).json({message:"Invalid credentials"})
    }
    const token = jwt.sign(
    {
      id: response.id
    },
    requiredInfo.JWT_SECRET
  );
  res.status(200).json({
      message: "Successfully Signed in",
      token,
    });
  } catch (err: any) {
    console.error("Signin error:", err.message);
    res.status(500).json({ error: "Signin failed" });
  }
}

export async function createRoom(req: Request, res: Response) {
    const roomName=req.body.roomName;
    const userId=(req as any).userId;
    if(!userId){
      return res.status(401).json({message:"User not authenticated"})
    }
    try{
        const roomCreated=await prismaClient.room.create({
            data:{
                roomname:roomName,
                adminId:userId,
            },
        })
        res.status(200).json({message:"Created the room successfully"})
    }catch(err){
      res.status(500).json({error:"Failed to create the room"})
    }
}

export async function getChats(req:Request,res:Response){
  const roomId=Number(req.params.roomId);
  if(!roomId){
    res.json({message:"RoomId not found"})
    return ;
  }
  try{
    const Chats=await prismaClient.chat.findMany({
      where:{roomId},
      orderBy:{
        id:"desc"
      },
      take:50
    })
    if(!Chats){
      return res.json({message:"No chats found"})
    }
    console.log(Chats);
    res.status(200).json(Chats)
  }catch(err){
    res.status(500).json({error:"Failed to get the chats"});
  }
}

export async function getroomName(req:Request,res:Response){
  const slug=req.params.slug;
  try{
    const response=await prismaClient.room.findUnique({
      where:{roomname:slug}
    })
    if(!response){
      res.json({message:""})
      return ;
    }
    res.status(200).json({roomId:response.id})
  }catch(err){
    res.status(200).json({error:"Failed to fetch the roomName"})
  }
}