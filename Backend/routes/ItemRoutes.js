import express from 'express'
import { AddItem, GetItems,BestSeller, GetProduct } from '../controller/ItemController.js';

const ItemRoute = express.Router();

ItemRoute.post('/add-item', AddItem)
ItemRoute.get('/get-items', GetItems)
ItemRoute.get('/best-seller', BestSeller)
ItemRoute.post('/get-item/:id',GetProduct)


export default ItemRoute;