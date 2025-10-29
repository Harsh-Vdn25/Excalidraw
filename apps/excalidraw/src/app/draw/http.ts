import axios from "axios";
import { BACKEND_URL } from "../../../config";
export async function getExistingMessages(roomId:string){
  try{
    const response=await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    const data=response.data;
    let shape;
    const shapes=data.map((x:{message:string})=>{
      shape=x.message
      return JSON.parse(shape)
    })
    return shapes;
  }catch(err){
    return [];
  }
}