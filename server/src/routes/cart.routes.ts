import express from "express";

import * as cartController from "../controllers/cart.controller";

const router = express.Router();

router.post("/user", cartController.getUserCart);

router.post("/update", cartController.setUserCart);

export default router;
