import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      data?: JwtPayload;
    }
  }
}
declare global {
  type User = {
    id: Number;
    username: string;
    role: string;
  };
}
