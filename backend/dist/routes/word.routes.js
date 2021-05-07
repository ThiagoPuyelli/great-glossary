"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var word_controllers_1 = require("../controllers/word.controllers");
var verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
var findUser_1 = __importDefault(require("../middlewares/findUser"));
var findGlossary_1 = __importDefault(require("../middlewares/findGlossary"));
router.put("/word/:id", verifyToken_1.default, findUser_1.default, findGlossary_1.default("id"), word_controllers_1.saveWord);
router.get("/word/:id/:wordID", verifyToken_1.default, findUser_1.default, findGlossary_1.default("id"), word_controllers_1.getWord);
router.delete("/word/:id/:wordID", verifyToken_1.default, findUser_1.default, findGlossary_1.default("id"), word_controllers_1.deleteWord);
router.put("/word/:id/:wordID", verifyToken_1.default, findUser_1.default, findGlossary_1.default("id"), word_controllers_1.updateWord);
exports.default = router;
