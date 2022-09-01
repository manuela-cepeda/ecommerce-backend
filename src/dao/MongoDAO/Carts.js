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
        
    createCart = async ()=>{
        let results = await this.model.create([]);
        return results;
    
    }

    getProductsCart = async (cid)=>{  
        try {
            let cart = await this.model.find({cid});
            let productsArr = []
            for(const item of cart.products){
                productsArr.push(
                    {
                    product:await services.productsService.getById(item?.pid),
                    qty:item?.qty
                    }
                )
            }
            return productsArr
        } catch (error) {
            console.log(`Cannot get products: ${error}`)
        }
    }
    
    addProductCart = async (cid, pid, qty) => {
        let product = await services.productsService.getById(pid)
        if(product === null){
            throw new Error("Cart manager error: the product doesn't exist")
        }else{
            try {
                let cart = await this.model.find({cid});
                
                if(cart.products.some(e =>e.pid === pid)){                    
                    for (const item of cart.products){
                        if(item.pid === pid){
                            let condition = (item.qty += qty)                        
                             item.qty = condition
                            
                        }
                    }
                }else{
                    if(qty < 1){
                        throw new Error("Cart manager error: invalid qty")
                    }else{
                        cart.products.push({pid, qty})
                    }
                }
                await this.updateCarts(cart)
            } catch (error) {
                console.log(`Cannot add products: ${error}`)
            }
        }
    }

    deleteProductCart = async (cid, pid) => {
        let cart = await this.model.find({cid});
        let newCartProduts = []
        if(cart.products.some(e =>e.pid === pid)){
            for (const item of cart.products){
                if(item.pid === pid){
                    continue
                }
                newCartProduts.push(item)
            }
        }
        cart.products = newCartProduts
        await this.updateCarts(cart)
        
    }

    updateCarts = async(cart) =>{
        let arr = await this.model.find()        
       
        arr.map((data)=> {
            if(data.cid === cart.cid){
                data.products = cart.products;
            }
        })
     
        return arr;
    }
}