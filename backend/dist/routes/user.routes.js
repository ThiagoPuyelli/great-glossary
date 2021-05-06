"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var user_controllers_1 = require("../controllers/user.controllers");
var verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
router.post("/register", user_controllers_1.registerUser);
router.post("/login", user_controllers_1.loginUser);
router.get("/verify-auth", verifyToken_1.default, function (req, res) { return res.json({ auth: true }); });
exports.default = router;
