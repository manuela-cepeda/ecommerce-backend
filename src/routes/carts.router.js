import { Router } from "express";
import services from "../dao/index.js";

const router = Router();

router.get('/', async (req,res)=>{  
    let carts = await services.cartsService.getAll(); 
    res.send(carts)
})

router.get('/:cid/products',  async (req,res)=>{
    let cid = req.params.cid
    let cart = await services.cartsService.getById(cid)
    if(cart == undefined ) return res.status(400).send({error:"cart doesn't exist"});
    if(cart.products == [] ) return res.status(400).send({error:"cart is empty"});
    let productsArr = []
    for(const item of cart.products){
        productsArr.push(
            {
            product:await services.productsService.getById(item?.pid),
            qty:item?.qty
            }
        )
    }
    res.send(productsArr)
})

router.post('/',  async (req,res)=>{  
    let cartCid = await services.cartsService.createCart()
    res.send({status:'success', message: cartCid })    
  }) 

router.post('/:cid/products',  async (req,res)=>{  
    let cid = req.params.cid
    const {pid, qty} = req.body;
    if(!pid || !qty) return res.status(400).send({error:"invalid"});     
    let cart = await services.cartsService.getById(cid)
    if(cart == undefined ) return res.status(400).send({error:"cart doesn't exist"});  
     let product = await services.productsService.getById(pid)
    if(product ===undefined) return res.status(400).send({error:"product doesn't exist"});  
    await services.cartsService.addProductCart(cid, pid, qty)
    res.send({status:'success',message:'successfully saved into the cart'}) 
}) 

router.delete('/:cid',  async (req,res)=>{
    let cid = req.params.cid
    await services.cartsService.deleteById(cid)
    res.send({status:'success', message: 'product deleted'})
   
})

router.delete('/:cid/products/:pid', async (req,res)=>{
    let cid = req.params.cid
    let pid = req.params.pid
    let cart = await services.cartsService.getById(cid)
    let product = cart?.products.find(item => item.pid === pid)
    if(cart == undefined ) return res.status(400).send({error:"cart doesn't exist"})   
    if(product == undefined ) return res.status(400).send({error:"product doesn't exist"})
    await services.cartsService.deleteProductCart(cid,pid)
    res.send({status:'success',message:'successfully deleted from cart'})
 

})

router.get('/*:params',(req,res)=>{
    res.send({ error : -2, descripcion: `route '/api/carts/${req.params[0]}' method 'GET' no implemented`})
})

export default router; 