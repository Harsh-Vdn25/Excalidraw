import jwt from "jsonwebtoken";
import { credentials } from "@repo/backend-common/config";
export function createToken(id:string){
    if(!id)return '';
    const secret=credentials.JWT_SECRET;
    if(!secret){
        throw new Error('No JWT_SECRET')
    };
    const token=jwt.sign({
        userId:id
    },secret)
    return token;
}