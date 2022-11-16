import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";

const router = Router();

router.get('/', cartsController.getCarts)

router.get('/:cid/products', cartsController.getCartProducts )

router.post('/', cartsController.createCart) 

router.post('/:cid/products', cartsController.addProductCart ) 

router.delete('/:cid', cartsController.deleteCart )

router.delete('/:cid/products/:pid', cartsController.deleteProductCart )

router.get('/*:params',(req,res)=>{
    res.send({ error : -2, descripcion: `route '/api/carts/${req.params[0]}' method 'GET' no implemented`})
})

export default router; 