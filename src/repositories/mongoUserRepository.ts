import { MongoClientDB } from "../db/mongo";
import { User } from "../models/user";
import { IUserRepository } from "./interfaces/iUserRepository";

export class MongoUserRepository implements IUserRepository {
  async findAll(): Promise<User[]> {
    const users = await MongoClientDB.db.collection<Omit<User, "id">>("users").find({}).toArray();

    return users.map(({ _id, ...rest }) => ({ ...rest, id: _id.toHexString() }));
  }
}
