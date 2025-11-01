import { api } from "@/helper/api";

export async function getExistingMessages(roomId:number){
  try{
    const response=await api.get(`/room/chats/${roomId}`,{
      headers:{
        "Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmNWQ4YzI2Ny1lYmZlLTQ5YWUtYjVkNy1iYWU0NDg3ZmIxY2MiLCJpYXQiOjE3NjE5MzMxNzl9.fVGajRu478MTV_W9VM2xhAtc7TO4h7_SrJTURM0hwzM`
      }
    });
    const data=response.data;
    let shape;
    const shapes=data.map((x:{shape:string})=>{
      return JSON.parse(x.shape);
    })
    return shapes;
  }catch(err){
    return [];
  }
}