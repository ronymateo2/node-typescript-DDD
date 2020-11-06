import dotenv from "dotenv";
// TODO: move to script to load on demand
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./api";

import { PORT } from "./config";

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/", routes());

  app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
  });
}

startServer();
