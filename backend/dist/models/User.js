"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    glossaries: { type: [{
                title: { type: String, required: true },
                words: [{
                        word: { type: String, required: true },
                        letter: { type: String, minLength: 1, maxLength: 1 }
                    }], default: []
            }], default: [] }
});
exports.default = mongoose_1.model("User", userSchema);
