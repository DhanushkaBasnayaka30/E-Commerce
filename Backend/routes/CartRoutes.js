

import express from 'express'
import { AddCart, GetCart,GetCartsbyMobile,RemoveCartItem } from '../controller/CartController.js';


const CartRoute = express.Router();


CartRoute.post('/add/:id',AddCart)
CartRoute.post('/get/:id',GetCart)
CartRoute.post('/getCarts/:id',GetCartsbyMobile)
CartRoute.delete('/remove_cart_item/:id',RemoveCartItem)


export default CartRoute;