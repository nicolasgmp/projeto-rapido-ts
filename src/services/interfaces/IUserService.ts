import { User } from "../../models/user";

export interface IUserService {
  findAll(): Promise<User[]>;
}
