import ApplicationError from "../exceptionHandlers/ApplicationError";
import DailyInventoryDelegate from "../delegates/DailyInventoryDelegate";
class DailyInventoryController {

  /**
   * Load csv data
   */
  public static async loadCsv() {
    try {
      const response = await DailyInventoryDelegate.loadCsv();
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Get DailyInventory data based on month and access mode
   * @param month 
   * @param mode 
   */
  public static async getData(month: string, mode: string) {
    try {
      const response = await DailyInventoryDelegate.getData(month, mode);
      return response;
    } catch (err) {
      throw err;
    }
  }
}
export default DailyInventoryController;
