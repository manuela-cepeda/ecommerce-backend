import pkg from 'mongoose';
import logger from "../config/pino.config.js";
import { cartsService, productsService } from "../services/services.js";

const { isValidObjectId } = pkg;


const getCarts = async(req,res)=>{
    try {
        let carts = await cartsService.getAll(); 
        res.send(carts)
    } catch (error) {
        logger.error('error getCart' + error)
    }
 }

 const getCartByUser = async (req,res) =>{   
    try {
        let uid = req.params.uid
        let cart = await cartsService.getByUser(uid); 
        if(cart == undefined ) return res.status(400).send({error:"cart doesn't exist"});
        res.send(cart)
    } catch (error) {
        logger.error('error getCartByUser' + error)
    }
  
 }


 const getCartProducts = async (req,res)=>{
    try {
        let cid = req.params.cid
        const isValid = isValidObjectId(cid)
        if (!isValid) return res.status(400).send({error:"is not a valid id"}) 
        let cart = await cartsService.getById(cid)
        if(cart == undefined ) return res.status(400).send({error:"cart doesn't exist"});
        if(cart.products == [] ) return res.status(400).send({error:"cart is empty"});
        let productsArr = []
        for(const item of cart.products){
            productsArr.push(
                {
                product:await productsService.getById(item?.pid),
                qty:item?.qty
                }
            )
        }
        res.send(productsArr)
    } catch (error) {
        logger.error('error getCartProducts' + error)
    }

}

const createCart =  async (req,res)=>{  
    try {
        const {buyer}= req.body 
        const isValid = isValidObjectId(buyer)
        if (!isValid) return res.status(400).send({error:"is not a valid  user id"}) 
        let cart = await cartsService.createCart(buyer)
        res.send(cart)    
    } catch (error) {
        logger.error('error createCart' + error)
    }

}

const addProductCart =   async (req,res)=>{  
    try {
        let cid = req.params.cid
        const isValid = isValidObjectId(cid)
        if (!isValid) return res.status(400).send({error:"is not a valid id"}) 
        let cart = await cartsService.getById(cid)
        if(cart == undefined ) return res.status(400).send({error:"cart doesn't exist"});  
        const products = req.body;
        products.forEach(async ({pid, qty}) => {
             if(!pid || !qty) return res.status(400).send({error:`invalid input`});     
             let product = await productsService.getById(pid)
            if(product ===undefined) return res.status(400).send({error:`product ${pid} doesn't exist` });  
            await cartsService.addProductCart(cid, pid, qty)
        });
        res.send({status:'success', message: 'product added'})
    } catch (error) {
        logger.error('error addProductCart' + error)
    }
 
}

const deleteProductCart = async (req,res)=>{
    try {
        let cid = req.params.cid
        const isValidCart = isValidObjectId(cid)
        if (!isValidCart) return res.status(400).send({error:"is not a valid cart id"}) 
        let pid = req.params.pid
        const isValidProduct = isValidObjectId(pid)
        if (!isValidProduct) return res.status(400).send({error:"is not a valid product id"}) 
        let cart = await cartsService.getById(cid)
        let product = cart?.products.find(item => item.pid === pid)
        if(cart == undefined ) return res.status(400).send({error:"cart doesn't exist"})   
        if(product == undefined ) return res.status(400).send({error:"product doesn't exist"})
        await cartsService.deleteProductCart(cid,pid)
        res.send({status:'success', message: 'product deleted'})
    } catch (error) {
        logger.error('error deleteProductCart' + error)
    }
   
 
}

const deleteCart = async (req,res)=>{
    try {
        let cid = req.params.cid
        const isValid = isValidObjectId(cid)
        if (!isValid) return res.status(400).send({error:"is not a valid id"}) 
        await cartsService.deleteById(cid)
        res.send({status:'success', message: 'cart deleted'})
    } catch (error) {
       logger.error('error deleteCart' + error)
    }
 
   
}

export default{
    getCarts,
    getCartProducts,
    createCart,
    addProductCart,
    deleteProductCart,
    deleteCart,
    getCartByUser
}