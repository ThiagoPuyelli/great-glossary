import { Router, Request, Response } from "express";
const router = Router();
import { registerUser, loginUser } from "../controllers/user.controllers";
import verifyToken from "../middlewares/verifyToken";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-auth", verifyToken, (req: Request, res: Response) => res.json({auth: true}));

export default router;