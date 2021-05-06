import { Router } from "express";
const router = Router();
import { deleteGlossary, getGlossary, getGlossaries, saveGlossary, updateGlossary } from "../controllers/glossary.controllers";
import verifyToken from "../middlewares/verifyToken";
import findUser from "../middlewares/findUser";

router.post("/glossary", verifyToken, findUser, saveGlossary);
router.get("/glossary", verifyToken, findUser, getGlossaries);
router.get("/glossary/:id/:letter", verifyToken, findUser, getGlossary);
router.delete("/glossary/:id", verifyToken, findUser, deleteGlossary);
router.put("/glossary/:id", verifyToken, findUser, updateGlossary);

export default router;