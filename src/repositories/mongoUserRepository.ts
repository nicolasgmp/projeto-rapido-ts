import { ObjectId } from "mongodb";
import { MongoClientDB } from "../db/mongo";
import { CreateUserParams, UpdateUserParams, User } from "../models/user";
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

  async updateUser(id: string, params: UpdateUserParams): Promise<User> {
    const { modifiedCount } = await MongoClientDB.db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: { ...params } });

    if (modifiedCount === 0) {
      throw new Error("User not updated");
    }

    const user = await MongoClientDB.db.collection<Omit<User, "id">>("users").findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found after updated");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
