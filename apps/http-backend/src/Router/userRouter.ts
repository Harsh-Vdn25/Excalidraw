import express,{Router} from 'express';
export const userRouter:Router=express.Router();

import { decodeToken } from '../middleware/decodeToken';
import { checkSignupInput,checkSignInInput } from '../middleware/inputValidation';
import {Signup,Signin,createRoom} from '../controller/userController'

userRouter.post('/signup',checkSignupInput,Signup);
userRouter.post('/signin',checkSignInInput,Signin);
userRouter.post('/room',decodeToken,createRoom);