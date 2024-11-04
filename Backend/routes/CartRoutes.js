import express from 'express'
import { AddCart, GetCart } from '../controller/CartController.js';


const CartRoute = express.Router();


CartRoute.post('/add/:id',AddCart)
CartRoute.post('/get/:id',GetCart)


export default CartRoute;