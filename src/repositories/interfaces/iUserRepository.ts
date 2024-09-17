import { CreateUserParams, User } from "../../models/user";

export interface IUserRepository {
  findAll(): Promise<User[]>;
  createUser(params: CreateUserParams): Promise<User>;
}
