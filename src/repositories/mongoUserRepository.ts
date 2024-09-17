import { MongoClientDB } from "../db/mongo";
import { CreateUserParams, User } from "../models/user";
import { IUserRepository } from "./interfaces/iUserRepository";

export class MongoUserRepository implements IUserRepository {
  async findAll(): Promise<User[]> {
    const users = await MongoClientDB.db.collection<Omit<User, "id">>("users").find({}).toArray();
    return users.map(({ _id, ...rest }) => ({ ...rest, id: _id.toHexString() }));
  }

  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClientDB.db.collection("users").insertOne(params);

    const user = await MongoClientDB.db.collection<Omit<User, "id">>("users").findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not created");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
