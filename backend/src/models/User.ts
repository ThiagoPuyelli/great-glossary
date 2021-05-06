import { model, Schema } from "mongoose";

const userSchema: Schema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    glossaries:{type: [{
        title: {type: String, required: true},
        words: {type: [{
            word: {type: String, required: true},
            letter: {type: String, minLength: 1, maxLength: 1},
            definition: {type: String, required: true}
        }], default: []}
    }], default: []}
});

export default model("User", userSchema);