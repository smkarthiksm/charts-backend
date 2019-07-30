import express from "express";
const router = express.Router();
import DailyInventoryController from "../controllers/DailyInventoryController";

router.get("/load", async (req, res, next) => {
  try {
    const response = await DailyInventoryController.load();
    res.send(response);
  } catch (err) {
    next(err);
  }
});

export default router;
