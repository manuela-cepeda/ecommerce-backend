import pkg from 'mongoose';
import logger from "../config/pino.config.js";
import admin from '../app.js'
import { productsService } from '../services/services.js';

const { isValidObjectId } = pkg;

const getProducts =  async(req,res)=> {
    try {
        let results = await productsService.getAll();
        res.send(results)
    } catch (error) {
        logger.error('error getProducts' + error)
    }
 }

 const getProductsByCategory = async ( req,res) => {
    try {
        const category = +req.params.category
         let results = await productsService.getByCategory(category);
         res.send(results)
    } catch (error) {
        logger.error('error getProductsByCategory' + error)
    }
}

 const getProductById = async(req,res)=> {
    try {
        let id = req.params.id
        const isValid = isValidObjectId(id)
        if (!isValid) return res.status(400).send({error:"is not a valid id"}) 
        let result = await productsService.getById(id)
        if(result == undefined ) return res.status(400).send({error:"product not found"});
         res.send(result)
    } catch (error) {
        logger.error('error getProductById' + error)
    }
 }

 const createProduct = async(req,res)=> {   
    try {
        if(!admin)  return res.status(401).send({error: "method 'POST' no authorized"})
        const result = await productsService.createProduct(req.body);
        res.send(result)
    } catch (error) {
        logger.error('error createProduct' + error)
    }
 }

 const deleteProductById =  async (req,res)=>{
    try {
        if(!admin)  return res.status(401).send({error:  "method 'DELETE' no authorized"})
       const id = req.params.id
       const isValid = isValidObjectId(id)
       if (!isValid) return res.status(400).send({error:"is not a valid id"}) 
       const product = await productsService.getById(id)
       if (!product ) return res.status(400).send({error:"product doesn't exist"}) 
       await productsService.deleteById(id)
       res.send({status:'success', message: 'product deleted'})
    } catch (error) {
        logger.error('error deleteProductById' + error)
    }
}

const updateProduct = async (req,res)=>{
    try {
        if(!admin) return res.status(401).send({error:  "method 'UPDATE' no authorized"})
        let product= req.body
        product.id = req.params.id
        const isValid = isValidObjectId(product.id)
        if (!isValid) return res.status(400).send({error:"is not a valid id"}) 
        await productsService.update( product)
        res.send({status:'success', message: 'product updated'})
    } catch (error) {
        logger.error('error updateProduct' + error)
    }
}


export default{
    getProducts,
    getProductById, 
    createProduct,
    deleteProductById,
    updateProduct,
    getProductsByCategory
}