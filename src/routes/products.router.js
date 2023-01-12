import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get('/', productsController.getProducts )

router.get('/category/:category', productsController.getProductsByCategory)
 
 router.get('/:id', productsController.getProductById)

 router.post('/', verifyToken, productsController.createProduct)

 router.delete('/:id', verifyToken, productsController.deleteProductById )

router.put('/:id', verifyToken, productsController.updateProduct)

router.get('/*:params',(req,res)=>{
    res.send({ error : -2, descripcion: `route '/api/products/${req.params[0]}' method 'GET' no implemented`})
})

export default router; 