"use client"
import axios from "axios";
import { useState,useEffect } from "react";
import { BACKEND_URL } from "../config";
interface chatsType{
    id:Number;
    message:string;
    roomId:string;
    sentBy:string;
}

async function getChats({roomId}:{roomId:string}) {
  try {
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    if(!response){
        return null;
    }
    console.log(response.data)
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
export default  function ChatRoom({roomId}:{roomId:string}) {
    const [prevChats,setprevChats]=useState<chatsType[]|[]>([]);
    useEffect(()=>{
        const fetchChats=async()=>{
            const data=await getChats({roomId});
            setprevChats(data);
        };
        fetchChats();
    },[roomId])

    return (
        <div>
            {
                prevChats&&prevChats.map((chat,index)=>(
                    <p key={index}>{chat.message}</p>
                ))
            }
        </div>  
    );
}
