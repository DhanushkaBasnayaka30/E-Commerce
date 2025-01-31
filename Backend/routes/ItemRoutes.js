import express from 'express'
import { AddItem, GetItems,BestSeller, GetProduct, ProductPrice } from '../controller/ItemController.js';
import multer from 'multer';

const ItemRoute = express.Router();


const upload = multer({ storage: multer.memoryStorage() });


ItemRoute.post('/add-item',upload.array('images'), AddItem)
ItemRoute.get('/get-items', GetItems)
ItemRoute.get('/best-seller', BestSeller)
ItemRoute.post('/get-item/:id',GetProduct)
ItemRoute.post('/get-itemPrices',ProductPrice)


export default ItemRoute;