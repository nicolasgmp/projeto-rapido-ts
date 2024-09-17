import express from "express";
import { config } from "dotenv";
import { MongoClientDB } from "./db/mongo";
import { initUsersRoute } from "./routes/userRoutes";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());
  app.use("/users", initUsersRoute());

  await MongoClientDB.connect();

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
