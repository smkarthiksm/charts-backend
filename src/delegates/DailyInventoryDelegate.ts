import csv from "csvtojson";
import path from "path";
import moment, { utc } from 'moment';

import * as ApplicationConstants from '../constants/ApplicationConstants';
import DailyInventoryDao from "../dao/DailyInventoryDao";
import DailyInventoryModel from "../models/DailyInventory";
import DailyInventoryChart from "../dtos/DailyInventoryChart";
class DailyInventoryDelegate {

  /**
   * Load csv data
   */
  public static async loadCsv() {
    try {
      const response = await DailyInventoryDao.getAll();
      if (response.length === 0) {
        await this.loadCsvFromFile(path.join(__dirname, `../files/Daily Inventory.csv`));
      }
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
      let response;
      const dailyInventoryChart: Array<DailyInventoryChart> = [];
      if (mode === 'day') {
        response = await DailyInventoryDao.getByDay(month);
        response.forEach((element) => {
          dailyInventoryChart.push(new DailyInventoryChart(moment((element as any).date).format("D"), (element as any).on_hand_value_sum))
        });
      }
      else if (mode === 'week') {
        response = await DailyInventoryDao.getByWeek(month);
        response.forEach((element, index) => {
          dailyInventoryChart.push(new DailyInventoryChart(`Week${index + 1}`, (element as any).on_hand_value_sum))
        });
      }
      return dailyInventoryChart;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Parse the csv file and insert data
   * @param csvFile 
   */
  public static async loadCsvFromFile(csvFile: any) {
    try {
      let csvData: Array<DailyInventoryModel> = [];
      const jsonArray = await csv().fromFile(csvFile);
      jsonArray.forEach(element => {
        console.log(moment(element[ApplicationConstants.DATE]).parseZone().format());

        csvData.push(new DailyInventoryModel({
          product_id: element[ApplicationConstants.PRODUCT_ID],
          date: moment(element[ApplicationConstants.DATE]).parseZone().format(),
          location: element[ApplicationConstants.LOCATION],
          on_hand_quantity: parseFloat(element[ApplicationConstants.ON_HAND_QUANTITY]),
          unit_cost: parseFloat(element[ApplicationConstants.UNIT_COST]),
          on_hand_value: parseFloat(element[ApplicationConstants.ON_HAND_VALUE])
        }));
      });
      let response = DailyInventoryDao.insert(csvData);
      return response;
    } catch (err) {
      throw err;
    }
  }
}
export default DailyInventoryDelegate;
