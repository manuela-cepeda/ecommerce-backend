import mongoose from "mongoose";
import MongoDBContainer from "./MongoContainer.js";
// import services from "../../dao/index.js";


const collection = 'carts';
const cartsSchema = mongoose.Schema ({
    products: {type: Array, require: true},
},{timestamps:true})

export default class Carts extends MongoDBContainer{
    constructor(){
        super(collection,cartsSchema)
    }
        
    // createCart = async ()=>{
    //     let cart={}
    //     cart.products = []
    //     this.save(cart)
        
    // }

    
    // addProductCart = async (cid, pid, qty) => {
    //     try {
    //         let cart = await this.getById(cid);
    //         if(cart.products?.some(e =>e.pid === pid)){                    
    //             for (const item of cart.products){
    //                 if(item.pid === pid){
    //                     let condition = (item.qty += qty)                        
    //                         item.qty = condition
                        
    //                 }
    //             }
    //         }else{
    //             if(qty < 1){
    //                 throw new Error("Cart manager error: invalid qty")
    //             }else{
    //                 cart.products.push({pid, qty})
    //             }
    //         }
    //         await this.update(cart)
    //     } catch (error) {
    //         console.log(`Cannot add products: ${error}`)
    //     }
        
    // }

    // deleteProductCart = async (cid, pid) => {
    //     let cart = await this.getById(cid);
    //     let newCartProduts = []
    //     if(cart.products?.some(e =>e.pid === pid)){
    //         for (const item of cart.products){
    //             if(item.pid === pid){
    //                 continue
    //             }
    //             newCartProduts.push(item)
    //         }
    //     }
    //     cart.products = newCartProduts
    //     await this.update(cart)
        
    // }

   
}