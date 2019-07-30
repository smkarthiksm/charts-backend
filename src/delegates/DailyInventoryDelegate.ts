// import ExceptionConstants from "../constants/ExceptionConstants";
// import ApplicationError from "../exceptionHandlers/ApplicationError";
import csv from "csv-parser";
import fs from "fs";
import path from "path";
import DailyInventoryDao from "../dao/DailyInventoryDao";
class DailyInventoryDelegate {
  public static async load() {
    try {
      const response = await DailyInventoryDao.getAll();
      if (response.length === 0) {
        this.loadCsv(path.join(__dirname, `../files/Daily Inventory.csv`));
      }

      return response;
    } catch (err) {
      throw err;
    }
  }
  public static loadCsv(csvFile: any) {
    fs.createReadStream(csvFile)
      .pipe(csv())
      .on("data", (row) => {
        console.log(row);
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
      });
  }
}
export default DailyInventoryDelegate;
