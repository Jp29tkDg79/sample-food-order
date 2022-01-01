import express from "express";

import * as productsController from "../controllers/item.controller";

const router = express.Router();

router.get("/all", productsController.allItems);

router.post("/create", productsController.createNewItem);

router.post("/update/:id", productsController.updateItem);

router.post("/delete/:id", productsController.deleteItem);

export default router;
