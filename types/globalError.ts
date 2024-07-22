import { JwtPayload } from "jsonwebtoken";

declare global {
  interface CustomError extends Error {
    status?: number;
  }
}
