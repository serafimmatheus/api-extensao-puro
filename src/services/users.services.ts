import { env } from "@/env";
import { MyError } from "@/errors/myError";
import { UsersRepositoryProps } from "@/repositories/prisma-users-repository";
import { CheckIn, User } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";

interface CreateUserIProps {
  name: string;
  email: string;
  password: string;
}

interface UserIProps {
  name: string;
  email: string;
  id?: string;
  created_at?: Date;
  checkIns?: CheckIn[];
}

interface LoginIProps {
  email: string;
  password: string;
}

export class UsersServices {
  constructor(private usersRepository: UsersRepositoryProps) {}

  login = async ({ email, password }: LoginIProps) => {
    const user = await this.usersRepository.findOneForEmail(email);

    if (!user) {
      throw new MyError("Login our password invalid", 400);
    }

    const isPasswordTrue = await compare(password, user.password_hash);

    if (!isPasswordTrue) {
      throw new MyError("Login our password invalid", 400);
    }

    const newUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    };

    const token = jwt.sign(newUser, env.SECURITY_TOKEN, { expiresIn: "1d" });

    return {
      token,
      user: newUser,
    };
  };

  findAll = async () => {
    const users = await this.usersRepository.allUsers();

    const newUsers = users.map((user: UserIProps) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      checkIns: user.checkIns?.map((checkins) => {
        return {
          id: checkins.id,
          validatedAt: checkins.validated_at,
          createdAt: checkins.created_at,
        };
      }),
    }));

    return newUsers;
  };

  findOneUser = async (id: string) => {
    const user = await this.usersRepository.findOneUser(id);

    if (!user) {
      throw new MyError("User not found", 404);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    };
  };

  create = async ({ email, name, password }: CreateUserIProps) => {
    const password_hash = await hash(password, 10);

    const userWithSameEmail = await this.usersRepository.findOneForEmail(email);

    if (userWithSameEmail) {
      throw new MyError("User already exists", 409);
    }

    const data = { email, name, password_hash };

    const user = await this.usersRepository.create(data);

    return user;
  };

  updated = async (id: string, data: CreateUserIProps) => {
    const { name, email, password } = data;

    const userExists = await this.usersRepository.findOneUser(id);

    console.log(userExists);

    const password_hash = await hash(password, 10);

    const newData = {
      name,
      email,
      password_hash,
    };

    const user = await this.usersRepository.updated(userExists.id, newData);

    return user;
  };

  delete = async (id: string) => {
    const userAlreadyExists = await this.usersRepository.findOneUser(id);

    if (!userAlreadyExists) {
      throw new Error("Usuário não encontrado");
    }

    const user = await this.usersRepository.delete(userAlreadyExists.id);

    return user;
  };
}
