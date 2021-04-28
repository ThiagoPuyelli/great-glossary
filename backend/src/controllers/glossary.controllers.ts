import User from "../models/User";
import { Request, Response } from "express";

export var saveGlossary = async (req: Request, res: Response) => {
    const { title } = req.body;

    if(title && title != ""){
        const { user } = req.body;
        
        if(user.glossaries.length > 0){
            for(let i of user.glossaries){
                if(i.title == title){
                    return res.json({error: "El nombre del glosario ya existe"})
                }
            }
        }
        
        const glossary = {
            title,
            words: []
        };

        user.glossaries.push(glossary);
        res.json(await User.findByIdAndUpdate(user._id, user, {new: true}));
    } else {
        res.json({
            error: "Error, el titulo no es válido"
        });
    }
}

export var getGlossaries = async (req: Request, res: Response) => {
    const { user } = req.body;

    res.json(user.glossaries);
}

export var getGlossary = async (req: Request, res: Response) => {
    const { user } = req.body;
    if(user.glossaries.length < 1) return res.json({error: "Error, no hay glossarios"});
    var glossary;

    for(let i of user.glossaries){
        if(i._id == req.params.id) glossary = i;
    }

    if(!glossary) return res.json({error: "Error, no existe el glosario"});
    
    return res.json(glossary);
}

export var deleteGlossary = async (req: Request, res: Response) => {
    const { user } = req.body;
    if(user.glossaries.length < 1) return res.json({error: "Error, no hay glossarios"});

    var verify: boolean = false
    for(let i in user.glossaries){
        if(user.glossaries[i]._id == req.params.id) {
            user.glossaries.splice(i, 1);
            verify = true
        };
    }

    if(!verify) return res.json({error: "Error, no existe el glosario"});

    const userUpdate = await User.findByIdAndUpdate(user._id, user, {new: true});
    if(!userUpdate) return res.json({error: "Error al modificar usuario"});
    
    return res.json("Glosario eliminado con éxito");

}

export var updateGlossary = async (req: Request, res: Response) => {
    const { user, title } = req.body;

    if(!title || title == "") return res.json({error: "El titulo no es válido"});

    var verify: boolean = false;
    for(let i in user.glossaries){
        if(user.glossaries[i]._id == req.params.id){
            user.glossaries[i].title = title;
            verify = true;
        }
    }

    if(!verify) return res.json({error: "No se encuentra el glosario"});

    const userUpdate = await User.findByIdAndUpdate(user._id, user, {new: true});
    if(!userUpdate) return res.json({error: "Error al modificar usuario"});

    return res.json("Glosario modificado con éxito");
}