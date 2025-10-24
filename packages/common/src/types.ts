import {z} from "zod";

export const CreateUserSchema=z.object({
    username:z.string().min(3).max(30),
    password:z.string().min(3),
    name:z.string()
})

export const SigninSchema=z.object({
    username:z.string().min(3).max(30),
    password:z.string().min(3)
})

export const CreateRoomSchema=z.object({
    roomName:z.string()
})