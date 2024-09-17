import { CreateUserParams, UpdateUserParams, User } from "../../models/user";

export interface IUserRepository {
  findAll(): Promise<User[]>;
  createUser(params: CreateUserParams): Promise<User>;
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
