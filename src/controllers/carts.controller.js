import { cartsService, productsService, usersService } from "../services/services.js";

import pkg from 'mongoose';
const { isValidObjectId } = pkg;


const getCarts = async(req,res)=>{
    let carts = await cartsService.getAll(); 
    res.send(carts)
 }


 const getCartProducts = async (req,res)=>{
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
}

const createCart =  async (req,res)=>{  
    let cart = await cartsService.createCart()
    res.send(cart)    
}

const addProductCart =   async (req,res)=>{  
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
}

const deleteProductCart = async (req,res)=>{
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
 
}

const deleteCart = async (req,res)=>{
    let cid = req.params.cid
    const isValid = isValidObjectId(cid)
    if (!isValid) return res.status(400).send({error:"is not a valid id"}) 
    await cartsService.deleteById(cid)
    res.send({status:'success', message: 'cart deleted'})
   
}

export default{
    getCarts,
    getCartProducts,
    createCart,
    addProductCart,
    deleteProductCart,
    deleteCart
}