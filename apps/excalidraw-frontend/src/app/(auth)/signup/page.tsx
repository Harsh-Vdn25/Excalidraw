"use client";
import { AuthContext } from "@/app/context/AuthProvider";
import { api } from "@/helper/api";
import { InputElement } from "@repo/ui/InputElement";
import { Button } from "@repo/ui/button";
import router from "next/router";
import { useState, useContext, useEffect } from "react";

export default function Signup() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const authcontext = useContext(AuthContext);
  if (!authcontext) {
    throw new Error("No context defined");
  }
  const { Token, setToken } = authcontext;

  useEffect(() => {
    const tokenStr = localStorage.getItem("Token");
    if (!tokenStr) return;
    const parsedToken = JSON.parse(tokenStr);
    setToken(parsedToken);
    router.push("/rooms");
  }, []);
  async function SignUp() {
    if (!email || !password || !name) return;
    try {
      const response = await api.post(
        `/user/signup`,
        {
          gmail: email,
          password,
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      
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
        <h1 className="text-center text-xl font-semibold mb-2">Signup</h1>

        <div className="flex flex-col gap-1">
          <label className="text-gray-200 text-sm">email:</label>
          <InputElement
            type="text"
            placeholder="Enter the email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-200 text-sm">Password:</label>
          <InputElement
            type="password"
            placeholder="Enter the password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-200 text-sm">Name:</label>
          <InputElement
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <Button children="Signin" type="submit" onClick={SignUp} />
      </form>
    </div>
  );
}
