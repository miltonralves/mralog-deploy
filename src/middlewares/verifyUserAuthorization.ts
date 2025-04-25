import type { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

function verifyUserAuthorization(role: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("Usuário não autenticado", 401);
    }

    if (!role.includes(req.user.role)) {
      throw new AppError("Usuário não autorizado", 403);
    }

    return next();
  };
}

export { verifyUserAuthorization };
