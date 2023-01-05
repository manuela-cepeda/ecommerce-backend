import { Router } from "express";
import ordersController from "../controllers/orders.controller.js";

const router = Router();

router.get('/', ordersController.getOrders)

router.get('/:oid', ordersController.getOrderById)

router.post('/', ordersController.createOrder) 

// router.post('/:oid/products', ordersController.addProductOrder ) 

router.delete('/:oid', ordersController.deleteOrderById)


router.get('/*:params',(req,res)=>{
    res.send({ error : -2, descripcion: `route '/api/orders/${req.params[0]}' method 'GET' no implemented`})
})

export default router; 