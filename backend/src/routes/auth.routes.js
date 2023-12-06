import { Router } from "express";
import {register, login, logout, profile} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/auth.jwt.js";
import { validateUser, handleValidationErrors } from "../middlewares/user.validation.js";

const router = Router();

router.post('/register', validateUser, handleValidationErrors, register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);
export default router