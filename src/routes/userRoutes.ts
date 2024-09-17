import express from "express";
import { MongoUserRepository } from "../repositories/mongoUserRepository";
import { UserService } from "../services/userService";
import { UserController } from "../controllers/userController";

export const initUsersRoute = () => {
  const usersRouter = express();

  const mongoUserRepository = new MongoUserRepository();
  const userService = new UserService(mongoUserRepository);
  const userController = new UserController(userService);

  usersRouter.get("/", async (req, res) => {
    const { body, statusCode } = await userController.findAll();
    res.status(statusCode).json({ body });
  });
  usersRouter.post("/", async (req, res) => {
    const { body, statusCode } = await userController.createUser({ body: req.body });
    res.status(statusCode).json({ body });
  });

  return usersRouter;
};
