import express from 'express'
import { AddItem } from '../controller/ItemController.js';



const ItemRoute = express.Router();


ItemRoute.post('/add-item', AddItem)


export default ItemRoute;