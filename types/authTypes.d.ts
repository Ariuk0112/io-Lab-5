import { JwtPayload } from "jsonwebtoken";

export interface LoginRequestBody {
  username: string;
  password: string;
} 

export type User = {
  id: string;
  name: string;
};
