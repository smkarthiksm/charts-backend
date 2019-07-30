import DailyInventoryDelegate from "../delegates/DailyInventoryDelegate";
class DailyInventoryController {
  public static async load() {
    try {
      const response = await DailyInventoryDelegate.load();
      return response;
    } catch (err) {
      throw err;
    }
  }
}
export default DailyInventoryController;
