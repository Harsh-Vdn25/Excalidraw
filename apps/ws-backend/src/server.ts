import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from 'jsonwebtoken';
import {requiredInfo} from '@repo/backend-common/config';

const wss=new WebSocketServer({port:8080});

wss.on('connection',(socket,request)=>{
    const url=request.url;
    if(!url){
        return;
    }
    const queryParams=new URLSearchParams(url.split('?')[1]);
    const token=queryParams.get('token')||"";
    const decoded=jwt.verify(token,requiredInfo.JWT_SECRET);
    if(!decoded||!(decoded as JwtPayload).id){
        socket.close();
        return ;
    }
    socket.on('message',(data)=>{
        socket.send('pong')
    })
    socket.on('close',()=>{
        console.log("socket closed")
    })
})