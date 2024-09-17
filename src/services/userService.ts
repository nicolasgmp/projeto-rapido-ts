import validator from "validator";
import { CreateUserParams, User } from "../models/user";
import { IUserRepository } from "../repositories/interfaces/iUserRepository";
import { IUserService } from "./interfaces/iUserService";

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;
  }

  async createUser(params: CreateUserParams): Promise<User> {
    const requiredFields = ["firstName", "lastName", "email", "password"];
    for (const field of requiredFields) {
      if (!params?.[field as keyof CreateUserParams]?.length) {
        throw new Error(`Field ${field} is required`);
      }
    }

    const emailIsValid = validator.isEmail(params.email);
    if (!emailIsValid) {
      throw new Error(`Field email malformated`);
    }

    const user = await this.userRepository.createUser(params);

    return user;
  }
}
