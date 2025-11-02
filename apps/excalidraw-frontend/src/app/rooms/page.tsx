"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { api } from "@/helper/api";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";

interface RoomType {
  id: Number;
  name: string;
  adminId: string;
}

export default function Page() {
  const [rooms, setRooms] = useState<RoomType[]>();
  const authcontext = useContext(AuthContext);
  const router = useRouter();

  if (!authcontext) {
    return;
  }

  const { Token, setToken } = authcontext;

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      return router.push("/signin");
    }
    setToken(JSON.parse(token));
  }, []);

  async function getRooms() {
    try {
      const response = await api.get("/room", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      if (response.data === "No Token") {
        return router.push("/signin");
      }
      setRooms(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRooms();
  }, [Token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Rooms</h1>
          <p className="text-slate-400">
            {rooms?.length || 0} room{rooms?.length !== 1 ? "s" : ""} available
          </p>
        </div>

        {/* ✅ Create Room Button */}
        <div className="flex justify-center mb-6">
          <Button
            onClick={() => router.push("/create-room")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition-all"
          >
            + Create Room
          </Button>
        </div>

        <div className="space-y-3">
          {rooms && rooms.length > 0 ? (
            rooms.map((x: RoomType) => (
              <Button
                key={String(x.id)}
                onClick={() => router.push(`room/${x.name}`)}
                className="w-full group relative overflow-hidden rounded-lg border border-slate-700 hover:border-blue-500 bg-gradient-to-r from-slate-900/50 to-slate-800/50 hover:from-slate-900 hover:to-slate-800 transition-all duration-300 p-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 transition-opacity duration-300" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path d="M3 3h6v6H3V3zm8 0h6v6h-6V3zm8 0h2v6h-2V3zM3 11h6v6H3v-6zm8 0h6v6h-6v-6zm8 0h2v6h-2v-6zM3 19h6v2H3v-2zm8 0h6v2h-6v-2zm8 0h2v2h-2v-2z" />
                      </svg>
                    </div>
                    <span className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                      {x.name}
                    </span>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Button>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400">No rooms available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
