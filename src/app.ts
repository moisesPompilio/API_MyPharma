import cors from "cors";
import express from "express";
import { NextFunction, Request, Response } from "express";
import logger from "morgan";

import { routes } from "./interfaces/routes";




const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use(routes);


app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      message: err.message,
    });
  }
  console.error(err);
  return response.status(404).json({
    status: "error",
    message: "Not Found",
  });
});

export { app };
