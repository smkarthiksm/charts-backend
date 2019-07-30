import { Sequelize } from "sequelize-typescript";
import * as constants from "../constants/DatabaseContants";

const db = new Sequelize({
  database: constants.DATABASE_NAME,
  dialect: "postgres",
  username: "postgres",
  password: "rootroot",
  modelPaths: [__dirname + "/models"]
});
export default db;
