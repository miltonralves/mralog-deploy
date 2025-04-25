import type { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { compare } from "bcrypt";
import { AppError } from "@/utils/AppError";
import { z } from "zod";
import { sign } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";

class SessionController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(req.body);

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("Email ou senha inválidos.", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email ou senha inválidos.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role ?? "customer" }, secret, {
      subject: user.id,
      expiresIn,
    });

    const { password: hashedPassword, ...userWithoutPassword } = user;

    return res.json({ token, user: userWithoutPassword });
  }
}

export { SessionController };
