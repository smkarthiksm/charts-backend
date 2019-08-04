import path from "path";
import { Sequelize } from "sequelize-typescript";
import * as constants from "../constants/DatabaseContants";

/**
 * Database configuration
 */
const db = new Sequelize({
  database: constants.DATABASE_NAME,
  dialect: "postgres",
  username: constants.USERNAME,
  password: constants.PASSWORD,
  modelPaths: [path.join(__dirname, `../models/`)],
  define: {
    freezeTableName: true
  },
  host: 'postgres',
  port: 5432,
});

export default db;
