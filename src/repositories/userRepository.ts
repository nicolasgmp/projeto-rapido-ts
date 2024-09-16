import { User } from "../models/user";
import { IUserRepository } from "./interfaces/iUserRepository";

export class UserRepository implements IUserRepository {
  async findAll(): Promise<User[]> {
    return [];
  }
}
