import type { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";

interface TokenPayload {
  role: string;
  sub: string;
}

 function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT Token not found", 401);
    }

    const [, token] = authHeader.split(" ");

    const { role, sub: user_id } = verify(
      token,
      authConfig.jwt.secret
    ) as TokenPayload;

    req.user = {
      id: user_id,
      role: role,
    };

    return next();
  } catch (error) {
    throw new AppError("JWT Token is missing", 401);
  }
}

export { ensureAuthenticated };