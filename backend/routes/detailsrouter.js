

import express from 'express';
import { GetDetails } from '../controllers/DetailsController.js';


const Router = express.Router();

Router.get('/getdetails',GetDetails);

export default Router;