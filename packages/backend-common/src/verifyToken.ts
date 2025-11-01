import jwt, { JwtPayload } from "jsonwebtoken";
const path = require("path");
require("dotenv").config({ path: "../../.env" });

export function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return false;
  }
  try {
    const decoded = jwt.verify(token, secret);

    if (!decoded || !(decoded as JwtPayload).userId) {
      return false;
    }

    return (decoded as JwtPayload).userId;
  } catch (err) {
    console.error("Invalid or expired token:", err);
    return false;
  }
}
