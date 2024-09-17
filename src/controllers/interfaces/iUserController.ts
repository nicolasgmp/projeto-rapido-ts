import { User } from "../../models/user";

export interface IUserController {
  findAll(): Promise<HttpResponse<User[]>>;
  createUser(params: HttpRequest<User>): Promise<HttpResponse<User>>;
}

export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpRequest<T> {
  params?: T;
  headers?: T;
  body?: T;
}
