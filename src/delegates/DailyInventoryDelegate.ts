// import ExceptionConstants from "../constants/ExceptionConstants";
// import ApplicationError from "../exceptionHandlers/ApplicationError";
import csv from "csvtojson";
import fs from "fs";
import path from "path";
import moment, { utc } from 'moment';

import * as ApplicationConstants from '../constants/ApplicationConstants';
import DailyInventoryDao from "../dao/DailyInventoryDao";
import DailyInventoryModel from "../models/DailyInventory";
import WeekModeDailyInventory from "../dtos/WeekModeDailyInventory";
class DailyInventoryDelegate {
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

  public static async getData(month: string, mode: string) {
    try {
      if (mode === 'day') {
        return await DailyInventoryDao.getByDay(month);
      }
      else if (mode === 'week') {
        const response = await DailyInventoryDao.getByWeek(month);
        console.log(response);
        const weekModeDailyInventory: Array<WeekModeDailyInventory> = [];
        response.forEach((element, index) => {
          weekModeDailyInventory.push(new WeekModeDailyInventory(`Week${index + 1}`, (element as any)["sum"]))
        });
        return weekModeDailyInventory;
      }
    } catch (err) {
      throw err;
    }
  }


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
