import express from 'express';

import * as baseController from '../controllers/base.controller';

const router = express.Router();

router.get('/csrf-Token', baseController.setCsrfToken);

export default router;