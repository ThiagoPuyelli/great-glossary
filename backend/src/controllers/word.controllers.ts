import User from "../models/User";
import { Request, Response } from "express";

export var saveWord = async (req: Request, res: Response) => {
    const { word, definition, user, glossaryIndex } = req.body;

    if(!word || !definition || definition == "" || word == "") return res.json({error: "La palabra no es válida"});

    const wordData = {
        word,
        letter: word.split("")[0].toUpperCase(),
        definition
    };

    user.glossaries[glossaryIndex].words.push(wordData);
    const userUpdate: any = await User.findByIdAndUpdate(user._id, user, {new: true});
    if(!userUpdate) return res.json({error: "Error al modificar usuario"});
    
    return res.json(userUpdate.glossaries[glossaryIndex]);
}

export var getWord = async (req: Request, res: Response) => {
    const { user, glossaryIndex } = req.body;
    var word;
    for(let i of user.glossaries[glossaryIndex].words){
        if(i._id == req.params.wordID){
            word = i;
        }
    }

    if(!word) return res.json({error: "La palabra no existe"});

    return res.json(word);
}

export var deleteWord = async (req: Request, res: Response) => {
    const { user, glossaryIndex } = req.body;

    var verify: boolean = false;
    for(let i in user.glossaries[glossaryIndex].words){
        if(user.glossaries[glossaryIndex].words[i]._id == req.params.wordID){
            user.glossaries[glossaryIndex].words.splice(i, 1);
            verify = true;
        }
    }

    if(!verify) return res.json({error: "No se encontro la palabra para eliminarla"});

    const userUpdate = await User.findByIdAndUpdate(user._id, user);

    if(!userUpdate) return res.json({error: "No se pudo eliminar la palabra"}); 

    return res.json("Palabra eliminada con éxito")
}

export var updateWord = async (req: Request, res: Response) => {
    const { user, glossaryIndex, word, definition } = req.body;

    var verify: boolean = false;
    for(let i in user.glossaries[glossaryIndex].words){
        if(user.glossaries[glossaryIndex].words[i]._id == req.params.wordID){
            user.glossaries[glossaryIndex].words[i].word = word;
            user.glossaries[glossaryIndex].words[i].definition = definition;
            verify = true;
        }
    }

    if(!verify) return res.json({error: "No se encontro la palabra para modificarla"});

    const userUpdate = await User.findByIdAndUpdate(user._id, user);

    if(!userUpdate) return res.json({error: "No se pudo modificar la palabra"}); 

    return res.json("Palabra modificada con éxito");
}