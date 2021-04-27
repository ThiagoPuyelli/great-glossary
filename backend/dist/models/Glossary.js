"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var glossarySchema = new mongoose_1.Schema({
    words: { type: [{
                word: { type: String, required: true },
                letter: { type: String, required: true, maxLength: 1, minLength: 1 }
            }], default: [] },
    userID: { type: String, required: true }
});
exports.default = mongoose_1.model("Glossary", glossarySchema);
