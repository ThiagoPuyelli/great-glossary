import morgan from "morgan";
import express, {Request, Response, NextFunction} from "express";

export default (app: any) => {
    
    // PORT

    app.set("port", process.env.PORT || 10000);

    // SETTINGS
    
    app.use(morgan("dev"));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    // CORS
    
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-access-token');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    // ROUTES

    // RETURN

    return app
    
}