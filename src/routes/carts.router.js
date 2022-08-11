import { Router } from "express";
import  {CartManager}  from '../managers/CartManager.js';
import  {ProductManager}  from '../managers/ProductManager.js';

const router = Router();
const cartService=  new CartManager();
const productService =  new ProductManager();

// router.get('/', async (req,res)=>{  
//     let carts = await cartService.getAll(); 
//     res.send({carts})
// })

router.post('/',  async (req,res)=>{  
    let cartCid = await cartService.createCart()
    res.send({status:'success', message: cartCid })    
  }) 

  router.delete('/:cid',  async (req,res)=>{
    let cid = parseInt(req.params.cid)
    if(isNaN(cid)) return res.status(400).send({error:"invalid value"});
    // if(id<1 || id>products.length ) return res.status(400).send({error:"producto no encontrado"}); no funciona cuando borro elementos por el medio   
    await cartService.deleteById(cid)
    res.send({status:'success', message: 'product deleted'})
   
})

router.get('/:cid/products',  async (req,res)=>{
    let cid = parseInt(req.params.cid)
    if(isNaN(cid)) return res.status(400).send({error:"invalid value"});    
    let cart = await cartService.getById(cid)
    if(cart == undefined ) return res.status(400).send({error:"cart doesn't exist"});
    let products = await cartService.getProductsCart(cid)        
    res.send({products})
})

router.post('/:cid/products',  async (req,res)=>{  
    let cid = parseInt(req.params.cid)
    const {pid, qty} = req.body;
    if(!pid || !qty) return res.status(400).send({error:"invalid"});     
    let cart = await cartService.getById(cid)
    if(cart == undefined ) return res.status(400).send({error:"cart doesn't exist"});        
    await cartService.addProductCart(cid, parseInt(pid), parseInt(qty))
    res.send({status:'success',message:'successfully saved into the cart'}) 
}) 


router.delete('/:cid/products/:pid', async (req,res)=>{
    let cid = parseInt(req.params.cid)
    let pid = parseInt(req.params.pid)
    let cart = await cartService.getById(cid)
    let product = await productService.getById(pid)
    if(cart == undefined ) return res.status(400).send({error:"cart doesn't exist"})   
    if(product == undefined ) return res.status(400).send({error:"product doesn't exist"})
    await cartService.deleteProductCart(cid,pid)
    res.send({status:'success',message:'successfully deleted from cart'})
 

})


router.get('/*:params',(req,res)=>{
    res.send({ error : -2, descripcion: `route '/api/products/${req.params[0]}' method 'GET' no implemented`})
})



export default router; 