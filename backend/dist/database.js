"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var uri = process.env.MONGODB_URI;
if (uri) {
    mongoose_1.default.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(function (connect) { return console.log("Connect to a database"); })
        .catch(function (err) { return console.log(err); });
}
