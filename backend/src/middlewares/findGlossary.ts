import { Request, Response, NextFunction } from "express";

export default (id: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        var glossaryIndex;
        for(let i in req.body.user.glossaries){
            if(req.body.user.glossaries[i]._id == req.params[id]){
                glossaryIndex = i;
            }
        }

        if(!glossaryIndex) res.json({error: "El glosario no existe"});

        req.body.glossaryIndex = glossaryIndex;
        next();
    }
}