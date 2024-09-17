import { User } from "../models/user";
import { IUserService } from "../services/interfaces/iUserService";
import { HttpResponse, IUserController } from "./interfaces/iUserController";

export class UserController implements IUserController {
  constructor(private readonly userService: IUserService) {}

  async findAll(): Promise<HttpResponse<User[]>> {
    try {
      const users = await this.userService.findAll();
      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Something went wrong: ${error}`,
      };
    }
  }
}
