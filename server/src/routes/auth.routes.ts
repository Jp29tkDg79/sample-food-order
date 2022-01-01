import express from "express";

import * as authController from "../controllers/auth.controller";

const router = express.Router();

router.get("/check/cookie", authController.checkCookie);

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

export default router;
