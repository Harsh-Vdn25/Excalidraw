import express,{Router} from 'express';
export const userRouter:Router=express.Router();

import { decodeToken } from '../middleware/decodeToken';
import {Signup,Signin,createRoom} from '../controller/userController'

userRouter.post('/signup',Signup);
userRouter.post('/signin',Signin);
userRouter.post('/room',decodeToken,createRoom);