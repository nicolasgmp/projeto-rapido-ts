import { MongoClientDB } from "../db/mongo";
import { User } from "../models/user";
import { IUserRepository } from "./interfaces/iUserRepository";

export class MongoUserRepository implements IUserRepository {
  async findAll(): Promise<User[]> {
    const users = await MongoClientDB.db.collection<User>("users").find({}).toArray();
    return [
      {
        firstName: "Nicolas",
        lastName: "Pereira",
        email: "nicolas@email.com",
        password: "12345",
      },
    ];
  }
}
