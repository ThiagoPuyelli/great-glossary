import User from "../models/User";
import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
    const token: string|string[]|undefined = req.headers["x-access-token"];
    if(!token || typeof token != "string") return res.json({error: "El token no es válido"});

    const user = await User.findById(token.split("|")[1]);
    if(!user) return res.json({error: "Error el usuario no existe"});
    
    req.body.user = user;
    next();
}