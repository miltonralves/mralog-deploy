import type { Request, Response } from "express";
import { hash } from "bcrypt";
import { z } from "zod";
import { prisma } from "../database/prisma";
import { AppError } from "@/utils/AppError";

class UsersController {
  async create(req: Request, res: Response) {
    const createUserBody = z.object({
      name: z.string().trim().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = createUserBody.parse(req.body);
    const passwordHash = await hash(password, 8);
    const userWithSameEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new AppError("Já existe um usuário cadastrado com esse email.");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json(userWithoutPassword);
  }
}

export { UsersController };
