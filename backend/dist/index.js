"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var app_1 = __importDefault(require("./app"));
var app = app_1.default(express_1.default());
require("./database");
app.listen(app.get("port"), console.log("Server connect on port " + app.get("port")));
