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

  // async loadCsv() {
  //   try {

  //   }
  //   catch (err) {
  //     throw err;
  //   }
  // }
}
export default DailyInventoryDao;
