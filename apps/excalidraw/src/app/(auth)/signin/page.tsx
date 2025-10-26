"use client"
import InputElement from "@repo/ui/InputElement";
import {Button} from '@repo/ui/button'
import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="w-screen h-screen bg-gray-800 flex justify-center items-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col bg-gray-900 p-6 gap-4 rounded-xl shadow-md shadow-black w-80"
      >
        <h1 className="text-center text-xl font-semibold mb-2">Signup</h1>

        <div className="flex flex-col gap-1">
          <label className="text-gray-200 text-sm">Username:</label>
          <InputElement
            type="text"
            placeholder="Enter the username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        <Button children="Signin" type="submit" onClick={()=>console.log('signin')}/>
      </form>
    </div>
  );
}
