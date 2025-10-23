import {Request,Response} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET=process.env.JWT_SECRET;


export async function Signup(req:Request,res:Response){
    if(!JWT_SECRET){
        throw new Error("");
    }
    const token=jwt.sign({
        id:1
    },JWT_SECRET)
}

export async function Signin(req:Request,res:Response){
    if(!JWT_SECRET){
        throw new Error("");
    }
    const token=jwt.sign({
        id:1
    },JWT_SECRET)
}

export async function createRoom(req:Request,res:Response){

}