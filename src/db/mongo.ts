import { Db, MongoClient } from "mongodb";

export const MongoClientDB = {
  client: undefined as unknown as MongoClient,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL || "localhost:27017";
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;

    const client = new MongoClient(url, { auth: { username, password } });
    const db = client.db("users-db");

    this.client = client;
    this.db = db;
  },
};
