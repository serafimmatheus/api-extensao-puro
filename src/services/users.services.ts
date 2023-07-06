import { MyError } from "@/errors/myError";
import { UsersRepositoryProps } from "@/repositories/prisma-users-repository";
import { compare, hash } from "bcryptjs";

interface CreateUserIProps {
  name: string;
  email: string;
  password: string;
  chaveApi: string;
  isActive: boolean;
  isAdm: boolean;
  siteUrl: string;
}

interface UserIProps {
  name: string;
  email: string;
  id?: string;
  created_at?: Date;
  isActive: boolean;
  isAdm: boolean;
  siteUrl: string;
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

    return {
      ...user,
      password_hash: undefined,
    };
  };

  me = async (user_id: string) => {
    const userMe = await this.usersRepository.findOneUser(user_id);

    if (!userMe) {
      throw new MyError("User Not found", 404);
    }

    return userMe;
  };

  findAll = async () => {
    const users = await this.usersRepository.allUsers();

    const newUsers = users.map((user: UserIProps) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      siteUrl: user.siteUrl,
      created_at: user.created_at,
      isAdm: user.isAdm,
      isActive: user.isActive,
    }));

    return newUsers;
  };

  findOneUser = async (id: string) => {
    const user = await this.usersRepository.findOneUser(id);

    if (!user) {
      throw new MyError("User not found", 404);
    }

    return {
      ...user,
      password_hash: undefined,
    };
  };

  create = async ({
    email,
    name,
    password,
    chaveApi,
    siteUrl,
  }: CreateUserIProps) => {
    const password_hash = await hash(password, 10);

    const userWithSameEmail = await this.usersRepository.findOneForEmail(email);

    if (userWithSameEmail) {
      throw new MyError("User already exists", 409);
    }

    const data = {
      email,
      name,
      password_hash,
      chaveApi,
      siteUrl,
    };

    const user = await this.usersRepository.create(data);

    return { ...user, password_hash: undefined };
  };

  updated = async (id: string, data: any) => {
    const { name, chaveApi, siteUrl } = data;

    const userExists = await this.usersRepository.findOneUser(id);

    if (!userExists) {
      throw new MyError("User not found", 404);
    }

    const newData = {
      name,
      chaveApi,
      siteUrl,
    };

    const user = await this.usersRepository.updated(newData, userExists.id);

    return { ...user, password_hash: undefined };
  };

  updatedIsActive = async (id: string, userAplication: string) => {
    const userExists = await this.usersRepository.findOneUser(id);

    if (!userExists) {
      throw new MyError("User not found", 404);
    }

    const userAdmin = await this.usersRepository.findOneUser(userAplication);

    if (!userAdmin) {
      throw new MyError("User not found", 404);
    }

    if (!userAdmin.isAdm) {
      throw new MyError("You are not admin", 403);
    }

    const alterIsActive = userExists.isActive;

    await this.usersRepository.updatedIsActive(userExists.id, !alterIsActive);

    return;
  };

  delete = async (id: string) => {
    const userAlreadyExists = await this.usersRepository.findOneUser(id);

    if (!userAlreadyExists) {
      throw new Error("Usuário não encontrado");
    }

    const user = await this.usersRepository.delete(userAlreadyExists.id);

    return { ...user, password_hash: undefined };
  };
}
