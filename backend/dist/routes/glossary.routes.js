"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var glossary_controllers_1 = require("../controllers/glossary.controllers");
var verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
router.post("/glossary", verifyToken_1.default, glossary_controllers_1.saveGlossary);
router.get("/glossary", verifyToken_1.default, glossary_controllers_1.getGlossaries);
exports.default = router;
