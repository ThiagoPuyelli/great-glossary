import User from "../models/User";
import { Request, Response } from "express";

export var saveGlossary = async (req: Request, res: Response) => {
    const { title } = req.body;

    if(title && title != ""){

        const token: string|string[]|undefined = req.headers["x-access-token"];
        if(!token || typeof token != "string") return res.json({error: "El token no es válido"}); 
        
        const user: any = await User.findById(token.split("|")[1]);
        if(!user) return res.json({error: "Error al encontrar el usuario"});
        
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
    const token: string|string[]|undefined = req.headers["x-access-token"];
    if(!token || typeof token != "string") return res.json({error: "Error el token es inválido"});
    
    const user: any = await User.findById(token.split("|")[1]);
    if(!user) return res.json({error: "No se encuentra el usuario"});

    res.json(user.glossaries);
}