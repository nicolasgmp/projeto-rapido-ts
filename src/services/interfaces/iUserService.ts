import { CreateUserParams, User } from "../../models/user";

export interface IUserService {
  findAll(): Promise<User[]>;
  createUser(params: CreateUserParams): Promise<User>;
}
