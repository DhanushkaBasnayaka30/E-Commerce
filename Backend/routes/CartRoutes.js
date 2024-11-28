import express from 'express'
import { AddCart, GetCart, GetCartTotal } from '../controller/CartController.js';


const CartRoute = express.Router();


CartRoute.post('/add/:id',AddCart)
CartRoute.post('/get/:id',GetCart)
CartRoute.get('/getTotal/:id',GetCartTotal)


export default CartRoute;