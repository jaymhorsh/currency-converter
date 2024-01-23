import express from "express";
import path from "node:path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { createServer as createViteServer } from "vite";
import config from "./config.js";
import cors from "cors";
import { register, login } from "./routes/route.js";

const { MONGODB_URL } = config;
mongoose
  .connect(MONGODB_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.error("error connecting:", error.message);
  });

const createServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(cors());
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.use(vite.middlewares);

  app.post("/api/register", register);
  app.post("/api/login", login);
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      status: "error",
      error: "Internal Server Error",
    });
  });
  app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
  });
};

createServer();
