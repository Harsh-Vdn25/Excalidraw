import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function decodeToken(req: Request, res: Response, next: NextFunction) {
  const BearerToken = req.headers.authorization;
  if (!BearerToken) {
    return;
  }
  const token = BearerToken.split(" ")[1];
  if (!token) {
    return;
  }
  const decoded = jwt.decode(token) as JwtPayload;
  if (!decoded) {
    return res.json({error:"Invalid token format"});
  }
  (req as any).userId=decoded.id;
  next();
}
