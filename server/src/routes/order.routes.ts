import express from 'express';

import * as OrderController from '../controllers/order.controller';

const router = express.Router();

router.post("/create", OrderController.createNewOrder);

export default router;