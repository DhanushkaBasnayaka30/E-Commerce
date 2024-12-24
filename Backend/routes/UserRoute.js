import express from "express";
import { Login, logout, Registration } from "../controller/UserController.js";
import UserAuthorize from "../Authentication/Authenticationmjs";

export const UserRoute=express.Router();

UserRoute.post("/registration",Registration);
UserRoute.post("/login",Login);
UserRoute.post("/logout",UserAuthorize,logout);

export default UserRoute;