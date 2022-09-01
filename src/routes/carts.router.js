import { Router } from "express";
import services from "../dao/index.js";
// import  {ProductManager}  from '../managers/ProductManager.js';

const router = Router();

// const productservices =  new ProductManager();

router.get('/', async (req,res)=>{  
    let carts = await services.cartsService.getAll(); 
    res.send({carts})
})

router.post('/',  async (req,res)=>{  
    let cartCid = await services.cartsService.createCart()
    res.send({status:'success', message: cartCid })    
  }) 

  router.delete('/:cid',  async (req,res)=>{
    let cid = parseInt(req.params.cid)
    if(isNaN(cid)) return res.status(400).send({error:"invalid value"});
    // if(id<1 || id>products.length ) return res.status(400).send({error:"producto no encontrado"}); no funciona cuando borro elementos por el medio   
    await services.cartsService.deleteById(cid)
    res.send({status:'success', message: 'product deleted'})
   
})

router.get('/:cid/products',  async (req,res)=>{
    let cid = parseInt(req.params.cid)
    if(isNaN(cid)) return res.status(400).send({error:"invalid value"});    
    let cart = await services.cartsService.getById(cid)
    if(cart == undefined ) return res.status(400).send({error:"cart doesn't exist"});
    let products = await services.cartsService.getProductsCart(cid)        
    res.send({products})
})

router.post('/:cid/products',  async (req,res)=>{  
    let cid = parseInt(req.params.cid)
    const {pid, qty} = req.body;
    if(!pid || !qty) return res.status(400).send({error:"invalid"});     
    let cart = await services.cartsService.getById(cid)
    if(cart == undefined ) return res.status(400).send({error:"cart doesn't exist"});        
    await services.cartsService.addProductCart(cid, parseInt(pid), parseInt(qty))
    res.send({status:'success',message:'successfully saved into the cart'}) 
}) 


router.delete('/:cid/products/:pid', async (req,res)=>{
    let cid = parseInt(req.params.cid)
    let pid = parseInt(req.params.pid)
    let cart = await services.cartsService.getById(cid)
    // let product = await productservices.getById(pid)
    if(cart == undefined ) return res.status(400).send({error:"cart doesn't exist"})   
    if(product == undefined ) return res.status(400).send({error:"product doesn't exist"})
    await services.cartsService.deleteProductCart(cid,pid)
    res.send({status:'success',message:'successfully deleted from cart'})
 

})


router.get('/*:params',(req,res)=>{
    res.send({ error : -2, descripcion: `route '/api/products/${req.params[0]}' method 'GET' no implemented`})
})



export default router; 