import { User } from "../../models/user";

export interface IUserRepository {
  findAll(): Promise<User[]>;
}
