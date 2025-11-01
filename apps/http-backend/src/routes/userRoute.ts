import express, { Router } from 'express'
import { SignIn, Signup } from '../controllers/userCotroller';

export const userRouter:Router=express.Router();

userRouter.post('/signup',Signup);
userRouter.post('/signin',SignIn);