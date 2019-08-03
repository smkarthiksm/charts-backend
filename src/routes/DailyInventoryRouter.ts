import express from "express";
const router = express.Router();
import DailyInventoryController from "../controllers/DailyInventoryController";
import * as ApplicationConstants from "../constants/ApplicationConstants";
import ApplicationError from "../exceptionHandlers/ApplicationError";

router.get("/getData", async (req, res, next) => {
  try {
    if (req.query.month && req.query.mode) {
      const response = await DailyInventoryController.getData(req.query.month, req.query.mode);
      res.send(response);
    }
    else {
      throw new ApplicationError(ApplicationConstants.BAD_REQUEST, 400)
    }
  } catch (err) {
    next(err);
  }
});

export default router;
