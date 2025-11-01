"use client";
import { AuthContext } from "@/app/context/AuthProvider";
import { api } from "@/helper/api";
import { InputElement } from "@repo/ui/InputElement";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authcontext = useContext(AuthContext);

  if (!authcontext) {
    throw new Error("No context defined");
  }
  const { Token, setToken } = authcontext;
  const router=useRouter();
  
  useEffect(()=>{
    const tokenStr=localStorage.getItem('Token');
    if(!tokenStr)return;
    const parsedToken = JSON.parse(tokenStr);
    setToken(parsedToken);
    router.push('/rooms');
  },[])

  async function Signin() {
    if(!email||!password) return;
    try {
      const response = await api.post("/user/signin",
        {
          gmail: email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      if(!response.data)return;
      const token=response.data.Token;
      localStorage.setItem('Token',JSON.stringify(token));
      setToken(token);
      router.push('/rooms')
    } catch (err) {
        console.log(err);
    }
  }
  return (
    <div className="w-screen h-screen bg-gray-800 flex justify-center items-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col bg-gray-900 p-6 gap-4 rounded-xl shadow-md shadow-black w-80"
      >
        <h1 className="text-center text-xl font-semibold mb-2">Signin</h1>

        <div className="flex flex-col gap-1">
          <label className="text-gray-200 text-sm">email:</label>
          <InputElement
            type="text"
            placeholder="Enter the email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-200 text-sm">Password:</label>
          <InputElement
            type="password"
            placeholder="Enter the password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <Button
          children="Signin"
          type="submit"
          onClick={Signin}
        />
      </form>
    </div>
  );
}
