import express, { Application, NextFunction, Request, Response } from "express";

import indexRouter from "./routes/IndexRouter";

// Create a new express application instance
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(indexRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) {
    // If err has no specified error code, set error code to 'Internal Server Error (500)'
    err.statusCode = 500;
  }
  // All HTTP requests must have a response, so let's send back an error with its status code and message
  res.status(err.statusCode).send(err.message);
});

app.listen(5000);
