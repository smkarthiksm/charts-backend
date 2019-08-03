import DailyInventoryDelegate from "../delegates/DailyInventoryDelegate";
class DailyInventoryController {
  public static async loadCsv() {
    try {
      const response = await DailyInventoryDelegate.loadCsv();
      return response;
    } catch (err) {
      throw err;
    }
  }

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
