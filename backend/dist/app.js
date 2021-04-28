"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var morgan_1 = __importDefault(require("morgan"));
var express_1 = __importDefault(require("express"));
var user_routes_1 = __importDefault(require("./routes/user.routes"));
var glossary_routes_1 = __importDefault(require("./routes/glossary.routes"));
var word_routes_1 = __importDefault(require("./routes/word.routes"));
exports.default = (function (app) {
    // PORT
    app.set("port", process.env.PORT || 11000);
    // SETTINGS
    app.use(morgan_1.default("dev"));
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.json());
    // CORS
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-access-token');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });
    // ROUTES
    app.use(user_routes_1.default);
    app.use(glossary_routes_1.default);
    app.use(word_routes_1.default);
    // RETURN
    return app;
});
