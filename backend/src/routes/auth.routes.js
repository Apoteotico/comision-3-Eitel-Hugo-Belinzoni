import { Router } from "express";
import {register, login, logout, profile} from "../controllers/auth.controller.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/profile', profile);
export default router