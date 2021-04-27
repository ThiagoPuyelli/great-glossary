import User from "../models/User";
import { Request, Response } from "express";
import encp from "../methods/encryptPassword";
import comp from "../methods/comparePassword";
import jwt from "jsonwebtoken";

export var registerUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(email && password && email != "" && password != ""){
        const user: any = new User();
        user.email = email;
        user.password = await encp(password);
        const userSave = user.save();
        if(userSave){
            const jwtPassword: undefined|string = process.env.JWT_PASSWORD;
            const token = await jwt.sign({id: user._id}, jwtPassword || "pepe", {
                expiresIn: 24 * 24 * 60
            });
            res.json({
                auth: true,
                token
            });
        } else {
            res.json({
                auth: false,
                error: "Error al guardar usuario"
            })
        }
    } else {
        res.json({
            auth: false,
            error: "Error, los datos son inválidos"
        })
    }
}

export var loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(email && password && email != "" && password != ""){
        const userFind: any = User.findOne({email});
        
        if(!userFind) return res.json({error: "El email no es válido"})
        
        console.log(userFind)
        const comparePassword = await comp(password, userFind.password);
        
        if(!comparePassword) return res.json({error: "La contraseña no es válida"})
        
        const jwtPassword: undefined|string = process.env.JWT_PASSWORD;
        const token = await jwt.sign({id: userFind._id}, jwtPassword || "pepe", {
            expiresIn: 24 * 24 * 60
        });

        res.json({
            auth: true,
            token
        })
        
    } else {
        res.json({
            auth: false,
            error: "Error, los datos son inválidos"
        })
    }

}