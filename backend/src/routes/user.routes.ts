import { Router } from "express";
const router = Router();
import { registerUser, loginUser } from "../controllers/user.controllers";

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;