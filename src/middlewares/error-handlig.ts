import type { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { ZodError } from "zod";

export function errorHandling(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      issues: error.format(),
    });
  }

  return res.status(500).json({
    status: "error",
    message: error.message,
  });
}
