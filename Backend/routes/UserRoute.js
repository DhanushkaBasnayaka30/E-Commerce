import express from "express";
import { Login, Registration } from "../controller/UserController.js";

export const UserRoute=express.Router();

UserRoute.post("/registration",Registration);
UserRoute.post("/login",Login);

export default UserRoute;