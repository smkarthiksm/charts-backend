import express from "express";
const router = express.Router();
import DailyInventoryController from "../controllers/DailyInventoryController";
import { raw } from "body-parser";

router.get("/getData", async (req, res, next) => {
  try {
    if (req.query.month && req.query.mode) {
      const response = await DailyInventoryController.getData(req.query.month, req.query.mode);
      res.send(response);
    }
    else {
      return "Bad"
    }
  } catch (err) {
    next(err);
  }
});

export default router;
