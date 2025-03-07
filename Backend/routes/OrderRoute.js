import express from 'express'
import { AddCart, GetCart, GetCartTotal } from '../controller/OrderControlller.js';


const OrderRoute = express.Router();


OrderRoute.post('/add',AddCart)
OrderRoute.post('/get/:id',GetCart)
OrderRoute.get('/getTotal/:id',GetCartTotal)


export default OrderRoute;