"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
var User_1 = __importDefault(require("../models/User"));
var encryptPassword_1 = __importDefault(require("../methods/encryptPassword"));
var comparePassword_1 = __importDefault(require("../methods/comparePassword"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userEmail, user, _b, userSave, jwtPassword, token;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!(email && password && email != "" && password != "")) return [3 /*break*/, 7];
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                userEmail = _c.sent();
                if (userEmail)
                    return [2 /*return*/, res.json({
                            auth: false,
                            error: "El mail ya existe"
                        })];
                user = new User_1.default();
                user.email = email;
                _b = user;
                return [4 /*yield*/, encryptPassword_1.default(password)];
            case 2:
                _b.password = _c.sent();
                return [4 /*yield*/, user.save()];
            case 3:
                userSave = _c.sent();
                if (!userSave) return [3 /*break*/, 5];
                jwtPassword = process.env.JWT_PASSWORD;
                return [4 /*yield*/, jsonwebtoken_1.default.sign({ id: user._id }, jwtPassword || "pepe", {
                        expiresIn: 24 * 24 * 60
                    })];
            case 4:
                token = _c.sent();
                res.json({
                    auth: true,
                    token: token + "|" + userSave._id
                });
                return [3 /*break*/, 6];
            case 5:
                res.json({
                    auth: false,
                    error: "Error al guardar usuario"
                });
                _c.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                res.json({
                    auth: false,
                    error: "Error, los datos son inv??lidos"
                });
                _c.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, userFind, comparePassword, jwtPassword, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!(email && password && email != "" && password != "")) return [3 /*break*/, 4];
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                userFind = _b.sent();
                if (!userFind)
                    return [2 /*return*/, res.json({ error: "El email no es v??lido" })];
                return [4 /*yield*/, comparePassword_1.default(password, userFind.password)];
            case 2:
                comparePassword = _b.sent();
                if (!comparePassword)
                    return [2 /*return*/, res.json({ error: "La contrase??a no es v??lida" })];
                jwtPassword = process.env.JWT_PASSWORD;
                return [4 /*yield*/, jsonwebtoken_1.default.sign({ id: userFind._id }, jwtPassword || "pepe", {
                        expiresIn: 24 * 24 * 60
                    })];
            case 3:
                token = _b.sent();
                res.json({
                    auth: true,
                    token: token + "|" + userFind._id
                });
                return [3 /*break*/, 5];
            case 4:
                res.json({
                    auth: false,
                    error: "Error, los datos son inv??lidos"
                });
                _b.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
