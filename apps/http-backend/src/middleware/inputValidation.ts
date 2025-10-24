import { Request, Response, NextFunction } from "express";
import { CreateUserSchema,SigninSchema } from "@repo/common/types";

export function checkSignupInput(req: Request, res: Response, next: NextFunction) {
  try {
    const requiredbody=CreateUserSchema.safeParse(req.body);
    if(!requiredbody.success){
        return res.status(400).json({
            error:"Invalid input"
        })
    }
    next();
  } catch (err) {
    return res.status(500).json({error:"Failed to check the input"})
  }
}

export function checkSignInInput(req: Request, res: Response, next: NextFunction) {
  try {
    const requiredbody=SigninSchema.safeParse(req.body);
    if(!requiredbody.success){
        return res.status(400).json({
            error:"Invalid input"
        })
    }
    next();
  } catch (err) {
    return res.status(500).json({error:"Failed to check the input"})
  }
}
