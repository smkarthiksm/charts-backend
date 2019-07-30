import * as express from "express";
const router = express.Router();
import DailyInventoryRouter from "./DailyInventoryRouter";

// routers used
router.use("/dailyInventory", DailyInventoryRouter);

export default router;
