import { model, Schema } from "mongoose";

const glossarySchema: Schema = new Schema({
    words: {type: [{
        word: {type: String, required: true},
        letter: {type: String, required: true, maxLength: 1, minLength: 1}
    }], default: []},
    userID: {type: String, required: true}
})

export default model("Glossary", glossarySchema);