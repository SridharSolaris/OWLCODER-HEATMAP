import CheckLogin from "../controllers/Logincontroler.js";
import express from 'express';
const Router = express.Router();

Router.post('/getlogins',CheckLogin);

export default Router;