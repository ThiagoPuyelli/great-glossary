"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (function (req, res, next) {
    var token = req.headers["x-access-token"];
    if (token && typeof token == "string") {
        var jwtPassword = process.env.JWT_PASSWORD;
        if (!jwtPassword)
            res.json({ error: "La contraseña da error" });
        if (jwtPassword) {
            jsonwebtoken_1.default.verify(token.split("|")[0], jwtPassword, function (err, decoded) {
                console.log(err);
                if (err)
                    return res.status(404).send({ error: "Token inválido" });
                if (decoded) {
                    req.decoded = decoded;
                    next();
                }
            });
        }
    }
});
