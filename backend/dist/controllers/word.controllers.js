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
exports.updateWord = exports.deleteWord = exports.getWord = exports.saveWord = void 0;
var User_1 = __importDefault(require("../models/User"));
var saveWord = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, word, definition, user, glossaryIndex, wordData, userUpdate;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, word = _a.word, definition = _a.definition, user = _a.user, glossaryIndex = _a.glossaryIndex;
                if (!word || !definition || definition == "" || word == "")
                    return [2 /*return*/, res.json({ error: "La palabra no es válida" })];
                wordData = {
                    word: word,
                    letter: word.split("")[0].toUpperCase(),
                    definition: definition
                };
                user.glossaries[glossaryIndex].words.push(wordData);
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(user._id, user, { new: true })];
            case 1:
                userUpdate = _b.sent();
                if (!userUpdate)
                    return [2 /*return*/, res.json({ error: "Error al modificar usuario" })];
                return [2 /*return*/, res.json(userUpdate.glossaries[glossaryIndex])];
        }
    });
}); };
exports.saveWord = saveWord;
var getWord = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user, glossaryIndex, word, _i, _b, i;
    return __generator(this, function (_c) {
        _a = req.body, user = _a.user, glossaryIndex = _a.glossaryIndex;
        for (_i = 0, _b = user.glossaries[glossaryIndex].words; _i < _b.length; _i++) {
            i = _b[_i];
            if (i._id == req.params.wordID) {
                word = i;
            }
        }
        if (!word)
            return [2 /*return*/, res.json({ error: "La palabra no existe" })];
        return [2 /*return*/, res.json(word)];
    });
}); };
exports.getWord = getWord;
var deleteWord = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user, glossaryIndex, verify, i, userUpdate;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, user = _a.user, glossaryIndex = _a.glossaryIndex;
                verify = false;
                for (i in user.glossaries[glossaryIndex].words) {
                    if (user.glossaries[glossaryIndex].words[i]._id == req.params.wordID) {
                        user.glossaries[glossaryIndex].words.splice(i, 1);
                        verify = true;
                    }
                }
                if (!verify)
                    return [2 /*return*/, res.json({ error: "No se encontro la palabra para eliminarla" })];
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(user._id, user)];
            case 1:
                userUpdate = _b.sent();
                if (!userUpdate)
                    return [2 /*return*/, res.json({ error: "No se pudo eliminar la palabra" })];
                return [2 /*return*/, res.json("Palabra eliminada con éxito")];
        }
    });
}); };
exports.deleteWord = deleteWord;
var updateWord = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user, glossaryIndex, word, definition, verify, i, userUpdate;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, user = _a.user, glossaryIndex = _a.glossaryIndex, word = _a.word, definition = _a.definition;
                verify = false;
                for (i in user.glossaries[glossaryIndex].words) {
                    if (user.glossaries[glossaryIndex].words[i]._id == req.params.wordID) {
                        user.glossaries[glossaryIndex].words[i].word = word;
                        user.glossaries[glossaryIndex].words[i].definition = definition;
                        verify = true;
                    }
                }
                if (!verify)
                    return [2 /*return*/, res.json({ error: "No se encontro la palabra para modificarla" })];
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(user._id, user)];
            case 1:
                userUpdate = _b.sent();
                if (!userUpdate)
                    return [2 /*return*/, res.json({ error: "No se pudo modificar la palabra" })];
                return [2 /*return*/, res.json("Palabra modificada con éxito")];
        }
    });
}); };
exports.updateWord = updateWord;
