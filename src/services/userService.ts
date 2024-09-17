import { User } from "../models/user";
import { IUserRepository } from "../repositories/interfaces/iUserRepository";
import { IUserService } from "./interfaces/iUserService";

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;
  }
}
