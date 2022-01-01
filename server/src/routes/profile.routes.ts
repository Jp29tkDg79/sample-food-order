import express from "express";

import * as profileController from "../controllers/profile.controller";

const router = express.Router();

router.get("/user", profileController.getProfile);

router.post("/update/:id", profileController.updateProfile);

export default router;
