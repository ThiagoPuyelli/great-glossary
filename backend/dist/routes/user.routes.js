"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var user_controllers_1 = require("../controllers/user.controllers");
router.post("/register", user_controllers_1.registerUser);
router.post("/login", user_controllers_1.loginUser);
exports.default = router;
