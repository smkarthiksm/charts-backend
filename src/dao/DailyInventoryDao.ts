import * as sequelize from "sequelize";
import * as DatabaseContants from "../constants/DatabaseContants"
import DailyInventoryModel from "../models/DailyInventory";

// let ExceptionConstants = require('../constants/ExceptionConstants');
// let ApplicationError = require('../exceptionHandlers/ApplicationError');
class DailyInventoryDao {
  public static async getAll() {
    try {
      return await DailyInventoryModel.findAll();
    } catch (err) {
      throw err;
    }
  }

  public static async getByDay(month: string) {
    try {
      return await DailyInventoryModel.sequelize.query(`SELECT ${DatabaseContants.DATE}, SUM (${DatabaseContants.ON_HAND_VALUE}) FROM "${DatabaseContants.CUSTOMER_TABLE}" WHERE EXTRACT(MONTH FROM ${DatabaseContants.DATE}) = :month GROUP BY ${DatabaseContants.DATE} ORDER BY date ASC;`, {
        replacements: { month: month },
        type: sequelize.QueryTypes.SELECT,
        raw: true,
      });
    } catch (err) {
      throw err;
    }
  }
  public static async getByWeek(month: string) {
    try {
      return await DailyInventoryModel.sequelize.query(`SELECT SUM (${DatabaseContants.ON_HAND_VALUE}) FROM "${DatabaseContants.CUSTOMER_TABLE}" WHERE EXTRACT(MONTH FROM ${DatabaseContants.DATE}) = :month GROUP BY date_trunc('week', ${DatabaseContants.DATE}) ORDER BY date_trunc('week', ${DatabaseContants.DATE}) ASC;`, {
        replacements: { month: month },
        type: sequelize.QueryTypes.SELECT,
        raw: true,
      });
    } catch (err) {
      throw err;
    }
  }

  public static async insert(data: Array<DailyInventoryModel>) {
    try {
      data.forEach(element => {
        element.save();
      });
    } catch (err) {
      throw err;
    }
  }
}
export default DailyInventoryDao;
