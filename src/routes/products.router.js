import { Router } from "express";
import admin from '../app.js'
import services from "../dao/index.js";


const router = Router();


router.get('/', async(req,res)=> {
    let results = await services.productsService.getAll();
    res.send(results)
 })

 
 router.get('/:id', async(req,res)=> {
    let id = parseInt(req.params.id)
    let result = await services.productsService.getById(id)
    if(result == undefined ) return res.status(400).send({error:"producto no encontrado"});
     res.send(result)
   
 })


 router.post('/', async(req,res)=> {   
    if(!admin)  return res.status(401).send({error: "method 'POST' no authorized"})
    let results = await services.productsService.save(req.body);
    res.send({status:'success', message: 'product added'})
 })

 router.delete('/:id',  async (req,res)=>{
     if(!admin)  return res.status(401).send({error:  "method 'DELETE' no authorized"})
    let id = parseInt(req.params.id)
    await services.productsService.deleteById(id)
    res.send({status:'success', message: 'product deleted'})
   
})

router.put('/:id', async (req,res)=>{
    if(!admin) return res.status(401).send({error:  "method 'DELETE' no authorized"})
    let product= req.body
    let id = parseInt(req.params.id)
    await services.productsService.update(id, product)
    res.send({status:'success', message: 'product updated'})
   
})





export default router; 