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
    console.log(response);
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

export async function createRoom(req: Request, res: Response) {}
