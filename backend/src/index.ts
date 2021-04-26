import dotenv from "dotenv";
dotenv.config();

import express from "express";
import config from "./app";

const app = config(express());
import "./database";

app.listen(app.get("port"), console.log("Server connect on port " + app.get("port")))