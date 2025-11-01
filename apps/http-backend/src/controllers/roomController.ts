import { prismaClient } from "@repo/db/client";
import { Request,Response } from "express";
import { statusCodes } from "../helper/statusCodes";
export async function getRooms(req:Request,res:Response){
    const userId=(req as any).userId;
    try{
        const response=await prismaClient.room.findMany({where:{adminId:userId}})
        if(!response){
            return res.status(statusCodes.NOTFOUND).json({message:"No rooms found"});
        }
        res.status(statusCodes.OK).json(response);
    }catch(err){
        res.status(statusCodes.INTERNALSERVERERROR).json({message:""})
    }
}

export async function createRoom(req:Request,res:Response){
    const roomName=req.body.roomName;
    const userId=(req as any).userId;
    try{
        const response=await prismaClient.room.create({
            data:{
                name:roomName,
                adminId:userId
            }
        })
        res.status(statusCodes.OK).json({message:"Sucessfully created the room"})
    }catch(err){
        res.status(statusCodes.INTERNALSERVERERROR).json({message:""})
    }
}

export async function getRoomId(req:Request,res:Response){
    const slug=req.params.slug;
    try{
        const response=await prismaClient.room.findUnique({where:{name:slug}})
        if(!response){
            return res.status(statusCodes.NOTFOUND).json({message:"room doesnot exist"});
        }
        res.status(statusCodes.OK).json(response)
    }catch(err){
        res.status(statusCodes.INTERNALSERVERERROR).json({message:""})
    }
}

export async function getChats(req:Request,res:Response){
    const roomId=Number(req.params.roomId);
    try{
        const response=await prismaClient.shape.findMany({where:{roomId}})
        if(!response){
            return res.status(statusCodes.NOTFOUND).json({message:"No Shapes found"});
        }
        res.status(statusCodes.OK).json(response)
    }catch(err){
        res.status(statusCodes.INTERNALSERVERERROR).json({message:""})
    }
}