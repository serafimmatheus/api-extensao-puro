import { prismaUsersRepository } from "@/repositories";
import { UsersServices } from "@/services/users.services";
import { compare } from "bcryptjs";

import { describe, expect, it } from "vitest";

describe("Register Use Case", () => {
  it("should hash user password upon registration"),
    async () => {
      const usersServices = new UsersServices(prismaUsersRepository);

      const { user } = await usersServices.create({
        name: "John Doe",
        email: "tugrp@example.com",
        password: "password",
      });

      const isPasswordCorretlyHashed = await compare(
        "password",
        user.password_hash
      );

      expect(isPasswordCorretlyHashed).toBe(true);
    };
});
