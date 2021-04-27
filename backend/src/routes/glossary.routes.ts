import { Router } from "express";
const router = Router();
import { getGlossaries, saveGlossary } from "../controllers/glossary.controllers";
import verifyToken from "../middlewares/verifyToken";

router.post("/glossary", verifyToken, saveGlossary);
router.get("/glossary", verifyToken, getGlossaries);

export default router;