import { Router } from "express";
import productsController from "../controllers/products.controller.js";

const router = Router();

router.get('/', productsController.getProducts )
 
 router.get('/:id', productsController.getProductById)

 router.post('/', productsController.createProduct)

 router.delete('/:id', productsController.deleteProductById )

router.put('/:id', productsController.updateProduct)

router.get('/*:params',(req,res)=>{
    res.send({ error : -2, descripcion: `route '/api/products/${req.params[0]}' method 'GET' no implemented`})
})

export default router; 