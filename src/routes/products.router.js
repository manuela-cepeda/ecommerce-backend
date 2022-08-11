import { Router } from "express";
import  {ProductManager}  from '../managers/ProductManager.js';
import admin from '../app.js'

const router = Router();
const productService=  new ProductManager();

router.post('/',  async (req,res)=>{
    if(!admin)  return res.status(401).send({error: "method 'POST' no authorized"})
    let {title, price, stock, thumbnail} = req.body;
    if(!title || !price || !stock) return res.status(400).send({error:"invalid"});
    let newProduct = {
        title,
        price,
        thumbnail,
        stock
    }
    await productService.save(newProduct)
    res.send({status:'success', message: 'product added'})
 
  })
 

router.get('/', async (req,res)=>{  
    let products = await productService.getAll(); 
    res.send({products})
})

router.get('/:id',  async (req,res)=>{
    let id = parseInt(req.params.id)
    if(isNaN(id)) return res.status(400).send({error:"el valor no es numerico"});    
    let product = await productService.getById((id))
    if(product == undefined ) return res.status(400).send({error:"producto no encontrado"});
     res.send({product})
})



router.put('/:id', async  (req,res)=>{
    if(!admin)  return res.status(401).send({error: "method 'PUT' no authorized"})
    let product= req.body
    let id = parseInt(req.params.id)
    if(isNaN(id)) return res.status(400).send({error:"el valor no es numerico"});
    // if(id<1 || id>products.length ) return res.status(400).send({error:"producto no encontrado"});no funciona cuando borro elementos por el medio 
    await productService.update(product, id)
    res.send({status:'success', message: 'product updated'})
})

router.delete('/:id',  async (req,res)=>{
    if(!admin)  return res.status(401).send({error:  "method 'DELETE' no authorized"})
    let id = parseInt(req.params.id)
    if(isNaN(id)) return res.status(400).send({error:"el valor no es numerico"});
    // if(id<1 || id>products.length ) return res.status(400).send({error:"producto no encontrado"}); no funciona cuando borro elementos por el medio   
    await productService.deleteById(id)
    res.send({status:'success', message: 'product deleted'})
   
})

router.get('/*:params',(req,res)=>{
    res.send({ error : -2, descripcion: `route '/api/products/${req.params[0]}' method 'GET' no implemented`})
})



export default router; 