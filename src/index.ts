import express from "express";
import { config } from "dotenv";
import { UserController } from "./controllers/userController";
import { MongoUserRepository } from "./repositories/mongoUserRepository";
import { UserService } from "./services/userService";
import { MongoClientDB } from "./db/mongo";

const main = async () => {
  config();

  const app = express();

  await MongoClientDB.connect();

  app.get("/users", async (req, res) => {
    const mongoUserRepository = new MongoUserRepository();
    const userService = new UserService(mongoUserRepository);
    const userController = new UserController(userService);

    const { body, statusCode } = await userController.findAll();
    res.send(body).status(statusCode);
  });

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
