import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import db from "../src/database/DatabaseWrapper";
import indexRouter from "./routes/IndexRouter";
import DailyInventoryController from "./controllers/DailyInventoryController";

const app: Application = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(indexRouter);


db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    db.sync().then(() => {
      DailyInventoryController.loadCsv();
    })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
  })
  .catch(err => {
    console.log(err);
  });
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (!JSON.parse(err.message).status) {
    err.statusCode = 500;
  }
  res.status(JSON.parse(err.message).status).send(JSON.parse(err.message).message);
});

app.listen(5000);
