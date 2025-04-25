import request from "supertest";
import { prisma } from "@/database/prisma";

import { app } from "@/app";

describe("SessionsController", () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        id: user_id,
      },
    });
  });

  it("should be able to authenticate a user", async () => {
    const userResponse = await request(app).post("/users").send({
      name: "Test User",
      email: "testUser@example.com",
      password: "password123456",
    });

    user_id = userResponse.body.id;

    const sessionResponse = await request(app).post("/session").send({
      email: "testUser@example.com",
      password: "password123456",
    });

    expect(sessionResponse.status).toBe(200);
    expect(sessionResponse.body.token).toEqual(expect.any(String));
  });
});
