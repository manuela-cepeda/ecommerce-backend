import admin from '../app.js'
import { productsService } from "../services/index.js";

const getProducts =  async(req,res)=> {
    let results = await productsService.getAll();
    res.send(results)
 }

 const getProductById = async(req,res)=> {
    let id = req.params.id
    let result = await productsService.getById(id)
    if(result == undefined ) return res.status(400).send({error:"producto no encontrado"});
     res.send(result)
 }

 const createProduct = async(req,res)=> {   
    if(!admin)  return res.status(401).send({error: "method 'POST' no authorized"})
     await productsService.createProduct(req.body);
    res.send({status:'success', message: 'product added'})
 }

 const deleteProductById =  async (req,res)=>{
    if(!admin)  return res.status(401).send({error:  "method 'DELETE' no authorized"})
   let id = req.params.id
   let product = await productsService.deleteById(id)
   if (product === undefined) return res.status(400).send({error:"product doesn't exist"}) 
   await productsService.deleteById(id)
   res.send({status:'success', message: 'product deleted'})
}

const updateProduct = async (req,res)=>{
    if(!admin) return res.status(401).send({error:  "method 'UPDATE' no authorized"})
    let product= req.body
    product.id = req.params.id
    await productsService.update( product)
    res.send({status:'success', message: 'product updated'})
   
}

export default{
    getProducts,
    getProductById, 
    createProduct,
    deleteProductById,
    updateProduct
}