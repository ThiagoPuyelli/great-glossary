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
exports.updateGlossary = exports.deleteGlossary = exports.getGlossary = exports.getGlossaries = exports.saveGlossary = void 0;
var User_1 = __importDefault(require("../models/User"));
var saveGlossary = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var title, user, _i, _a, i, glossary, userUpdate;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                title = req.body.title;
                if (!(title && title != "")) return [3 /*break*/, 2];
                user = req.body.user;
                if (user.glossaries.length > 0) {
                    for (_i = 0, _a = user.glossaries; _i < _a.length; _i++) {
                        i = _a[_i];
                        if (i.title == title) {
                            return [2 /*return*/, res.json({ error: "El nombre del glosario ya existe" })];
                        }
                    }
                }
                glossary = {
                    title: title,
                    words: []
                };
                user.glossaries.push(glossary);
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(user._id, user, { new: true })];
            case 1:
                userUpdate = _b.sent();
                if (!userUpdate)
                    res.json({ error: "Error al modificar usuario" });
                res.json(glossary);
                return [3 /*break*/, 3];
            case 2:
                res.json({
                    error: "Error, el titulo no es v??lido"
                });
                _b.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.saveGlossary = saveGlossary;
var getGlossaries = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        user = req.body.user;
        res.json(user.glossaries);
        return [2 /*return*/];
    });
}); };
exports.getGlossaries = getGlossaries;
var getGlossary = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, letter, glossary, _i, _a, i, words, _b, _c, i;
    return __generator(this, function (_d) {
        user = req.body.user;
        letter = req.params.letter;
        if (user.glossaries.length < 1)
            return [2 /*return*/, res.json({ error: "Error, no hay glossarios" })];
        for (_i = 0, _a = user.glossaries; _i < _a.length; _i++) {
            i = _a[_i];
            if (i._id == req.params.id)
                glossary = i;
        }
        if (!glossary)
            return [2 /*return*/, res.json({ error: "Error, no existe el glosario" })];
        words = [];
        for (_b = 0, _c = glossary.words; _b < _c.length; _b++) {
            i = _c[_b];
            if (i.letter == letter.toUpperCase()) {
                words.push(i);
            }
        }
        glossary.words = words;
        return [2 /*return*/, res.json(glossary)];
    });
}); };
exports.getGlossary = getGlossary;
var deleteGlossary = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, verify, i, userUpdate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.body.user;
                if (user.glossaries.length < 1)
                    return [2 /*return*/, res.json({ error: "Error, no hay glossarios" })];
                verify = false;
                for (i in user.glossaries) {
                    if (user.glossaries[i]._id == req.params.id) {
                        user.glossaries.splice(i, 1);
                        verify = true;
                    }
                    ;
                }
                if (!verify)
                    return [2 /*return*/, res.json({ error: "Error, no existe el glosario" })];
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(user._id, user, { new: true })];
            case 1:
                userUpdate = _a.sent();
                if (!userUpdate)
                    return [2 /*return*/, res.json({ error: "Error al modificar usuario" })];
                return [2 /*return*/, res.json("Glosario eliminado con ??xito")];
        }
    });
}); };
exports.deleteGlossary = deleteGlossary;
var updateGlossary = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user, title, verify, i, userUpdate;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, user = _a.user, title = _a.title;
                if (!title || title == "")
                    return [2 /*return*/, res.json({ error: "El titulo no es v??lido" })];
                verify = false;
                for (i in user.glossaries) {
                    if (user.glossaries[i]._id == req.params.id) {
                        user.glossaries[i].title = title;
                        verify = true;
                    }
                }
                if (!verify)
                    return [2 /*return*/, res.json({ error: "No se encuentra el glosario" })];
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(user._id, user, { new: true })];
            case 1:
                userUpdate = _b.sent();
                if (!userUpdate)
                    return [2 /*return*/, res.json({ error: "Error al modificar usuario" })];
                return [2 /*return*/, res.json("Glosario modificado con ??xito")];
        }
    });
}); };
exports.updateGlossary = updateGlossary;
