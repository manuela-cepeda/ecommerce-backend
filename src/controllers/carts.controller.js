import { cartsService } from "../services/services.js";


const getCarts = async(req,res)=>{
    let carts = await cartsService.getAll(); 
    res.send(carts)
 }

 const getCartProducts = async (req,res)=>{
    let cid = req.params.cid
    let cart = await cartsService.getById(cid)
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
}

const createCart =  async (req,res)=>{  
    let cartCid = await cartsService.createCart()
    res.send({status:'success', message: cartCid })    
}

const addProductCart =  async (req,res)=>{  
    let cid = req.params.cid
    const {pid, qty} = req.body;
    if(!pid || !qty) return res.status(400).send({error:"invalid"});     
    let cart = await cartsService.getById(cid)
    if(cart == undefined ) return res.status(400).send({error:"cart doesn't exist"});  
     let product = await services.productsService.getById(pid)
    if(product ===undefined) return res.status(400).send({error:"product doesn't exist"});  
    await cartsService.addProductCart(cid, pid, qty)
    res.send({status:'success',message:'successfully saved into the cart'}) 
}

const deleteProductCart = async (req,res)=>{
    let cid = req.params.cid
    let pid = req.params.pid
    let cart = await cartsService.getById(cid)
    let product = cart?.products.find(item => item.pid === pid)
    if(cart == undefined ) return res.status(400).send({error:"cart doesn't exist"})   
    if(product == undefined ) return res.status(400).send({error:"product doesn't exist"})
    await cartsService.deleteProductCart(cid,pid)
    res.send({status:'success',message:'successfully deleted from cart'})
 
}

const deleteCart = async (req,res)=>{
    let cid = req.params.cid
    await cartsService.deleteById(cid)
    res.send({status:'success', message: 'product deleted'})
   
}

export default{
    getCarts,
    getCartProducts,
    createCart,
    addProductCart,
    deleteProductCart,
    deleteCart
}