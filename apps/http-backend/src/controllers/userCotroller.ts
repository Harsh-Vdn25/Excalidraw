import { prismaClient } from "@repo/db/client";
import bcrypt from 'bcrypt'
import { Request,Response,NextFunction } from "express";
import { hashPassword } from "../helper/hashPassword";
import { statusCodes } from "../helper/statusCodes";
import { createToken } from "../helper/createToken";

export async function Signup(req:Request,res:Response,next:NextFunction){
        const {gmail,password,name}=req.body;
    try{
        const hashedPassword=await hashPassword(password);
        const response=await prismaClient.user.create({
            data:{
                gmail:gmail,
                password:hashedPassword,
                username:name
            }
        })
        const token=createToken(response.id);
        res.status(statusCodes.OK).json({
            message:"Sucessfully signed up",
            Token:token
        })
    }catch(err){
        res.status(statusCodes.INTERNALSERVERERROR).json({message:"Internal server error"})
    }
}
export async function SignIn(req:Request,res:Response,next:NextFunction){
    const {gmail,password}=req.body;
    try{
        const response=await prismaClient.user.findUnique({where:{gmail}});
        if(!response){
            return res.status(statusCodes.NOTFOUND).json({message:"Please Signup"});
        }
        const isAuthorized=await bcrypt.compare(password,response?.password);
        if(!isAuthorized){
            return res.status(statusCodes.UNAUTHORIZED).json({message:"Incorrect password"});
        }
        const token=createToken(response.id);
        res.status(statusCodes.OK).json({
            Token:token
        })
    }catch(err){
        res.status(statusCodes.INTERNALSERVERERROR).json({message:""})
    }
}