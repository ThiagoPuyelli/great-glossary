import { Router } from "express";
const router = Router();
import { getWord, saveWord, deleteWord } from "../controllers/word.controllers";
import verifyToken from "../middlewares/verifyToken";
import findUser from "../middlewares/findUser";
import findGlossary from "../middlewares/findGlossary";

router.put("/word/:id", verifyToken, findUser, findGlossary("id"), saveWord);
router.get("/word/:id/:wordID", verifyToken, findUser, findGlossary("id"), getWord);
router.delete("/word/:id/:wordID", verifyToken, findUser, findGlossary("id"), deleteWord);

export default router;