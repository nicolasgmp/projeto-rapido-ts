import { User } from "../../models/user";

export interface IUserController {
  findAll(): Promise<HttpResponse<User[]>>;
}

export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}
