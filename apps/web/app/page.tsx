"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home(){
  const [slug,setSlug]=useState('');
  const router =useRouter();
  return (
  <div style={{
    "display":"flex",
    "justifyContent":"center",
    "gap":"5px",
    "padding":"5px"
  }}>
    <input type="text" placeholder="RoomName"
    value={slug} onChange={(e)=>setSlug(e.target.value)}
    style={{
      "padding":"5px"
    }}/>
    <button onClick={()=>{
        if(slug.trim()){
          return router.push(`/room/${slug}`);
        }
    }}
    style={{
      "padding":"5px"
    }}>Set</button>
  </div>
  );
}