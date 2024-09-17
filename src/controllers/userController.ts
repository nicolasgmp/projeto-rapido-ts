import { CreateUserParams, User } from "../models/user";
import { IUserService } from "../services/interfaces/iUserService";
import { HttpRequest, HttpResponse, IUserController } from "./interfaces/iUserController";

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

  async createUser(req: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
    try {
      if (!req.body) {
        return {
          statusCode: 400,
          body: "Please, specify a body",
        };
      }

      const user = await this.userService.createUser(req.body);
      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error while creating the user ${error}`,
      };
    }
  }
}
