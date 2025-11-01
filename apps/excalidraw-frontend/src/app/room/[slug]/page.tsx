"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/AuthProvider";
import CanvasPage from "@/app/draw/page";
import { api } from "@/helper/api";

type ParamsPromise = Promise<{ slug: string }>;

export default function Canvas({ params }: { params: ParamsPromise }) {
  const authcontext = useContext(AuthContext);
  const [slug, setSlug] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<number | null>(null);

  useEffect(()=>{
    params.then((p)=>setSlug(p.slug)).
    catch((err)=>{console.log("failed to ")})
  },[params])

  useEffect(() => {
    if (!authcontext || !slug) return;
    const { Token } = authcontext;

    async function getRoomId() {
      try {
        const response = await api.post(
          `room/${slug}`,
          {},
          { headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmNWQ4YzI2Ny1lYmZlLTQ5YWUtYjVkNy1iYWU0NDg3ZmIxY2MiLCJpYXQiOjE3NjE5MzMxNzl9.fVGajRu478MTV_W9VM2xhAtc7TO4h7_SrJTURM0hwzM` } }
        );
        setRoomId(response.data.id);
      } catch (err) {
        console.error(err);
      }
    }

    getRoomId();
  }, [authcontext, slug]);

  if (!slug) return <p>Loading params...</p>;
  if (!roomId) return <p>Loading room...</p>;

  return <CanvasPage roomId={roomId} />;
}
