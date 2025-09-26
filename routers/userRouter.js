import express from "express";
import { login, register } from "../controllers/userController.js";
import { validate } from "../middlewares/validation.js";
import { loginValidation } from "../middlewares/inputValidation.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", validate(loginValidation), login);

export default router;
