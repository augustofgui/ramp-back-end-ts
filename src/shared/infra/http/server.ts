import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'reflect-metadata';

import routes from './routes';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

import '@shared/container';

const app = express();

app.use
app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    console.log(err);

    return response.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
);

app.listen(3333, () => {
  console.log("🐵 Server Running on port 3333...!");
});
