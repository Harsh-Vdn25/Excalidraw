import {Request,Response,NextFunction} from 'express';
import { verifyToken } from "@repo/backend-common/verifyToken";
import { statusCodes } from '../helper/statusCodes';

export function decodeToken(req:Request,res:Response,next:NextFunction){
    const Bearer=req.headers.authorization;
    if(!Bearer){
        return res.status(statusCodes.BADREQUEST).json({message:"No token"})
    }
    const token=Bearer?.split(" ")[1];
    if(!token){
        return res.status(statusCodes.BADREQUEST).json({message:"No token"})
    }
    const userId=verifyToken(token);
    if(!userId){
        return res.status(statusCodes.UNAUTHORIZED).json({message:"Un authorized"})
    }
    (req as any).userId=userId;
    next();
}