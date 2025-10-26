import { BACKEND_URL } from '../../config';
import ChatRoom from '../../components/ChatRoom';
import ChatRoomClient from '../../components/ChatRoomClient';

export default async function Room({params}:{
    params:{slug:string}
}){
    async function getroomId(slug:string){
    try{
        const response =await fetch(`${BACKEND_URL}/room/${slug}`,{cache:"no-store"});
        if(!response.ok)return null;
        const obj= await response.json();
        return obj.roomId;
    }catch(err){
        return null;
    }
}
    const slug=(await params).slug;
    const roomId=(await getroomId(slug)).toString();
    console.log(typeof roomId)
    return (
        <div>
            <ChatRoom roomId={roomId}/>
            <ChatRoomClient roomId={roomId}/>
        </div>
    );
}