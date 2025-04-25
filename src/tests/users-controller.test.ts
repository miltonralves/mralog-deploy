import request from "supertest";
import { prisma } from "@/database/prisma";

import { app } from "@/app";

describe("UsersController", () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        id: user_id,
      },
    });
  });

  it("should create a new user successfully", async () => {
    const response = await request(app).post("/users").send({
      name: "Test User",
      email: "testUser@example.com",
      password: "password123456",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", "Test User");

    user_id = response.body.id;
  });

  it("should throw an error if user with same email already exists", async () => {
    const response = await request(app).post("/users").send({
      name: "Duplicate User",
      email: "testUser@example.com",
      password: "password123456",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Já existe um usuário cadastrado com esse email."
    );
  });

  it("should throw a validation error if email is invalid", async () => {
    const response = await request(app).post("/users").send({
      name: "Test User",
      email: "invalid-email",
      password: "password123456",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Validation error");
  });  

  
});
