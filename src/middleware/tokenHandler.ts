import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
// import { User } from "@prisma/client";
dotenv.config();

const auth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  if (token == null)
    return res.status(401).json({
      success: false,
      message: "token is null",
    });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY as string, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: err.message,
      });
    }

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    req.data = decoded as JwtPayload;
    next();
  });
};

function generateAccessToken(
  user: User,
  secret: string,
  expiresIn: string | number
) {
  return jwt.sign(user, secret, { expiresIn });
}

export { auth, generateAccessToken };
