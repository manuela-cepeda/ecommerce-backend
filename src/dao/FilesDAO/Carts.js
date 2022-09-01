import __dirname from "../../utils.js";
import FilesContainer from "./FilesContainer.js";
import fs from "fs";
// import services from "../../dao/index.js";



const path = __dirname + '/files/carts.json';

export default class Products extends FilesContainer{
    constructor(){
        super(path)
    }
    
    
    createCart = async ()=>{
        let data = await this.getAll()
        let cart={}
        if (data.length === 0) {
            cart.cid = 1
            cart.timeStamp = Date.now().toLocaleString()
        }else{
            cart.cid= data[data.length - 1].cid + 1
            cart.timeStamp = Date.now().toLocaleString()
        }
        cart.products = []
        data.push(cart)

        await fs.promises.writeFile(path, JSON.stringify(data, null, '\t'))
        return cart.cid
    }

    getProductsCart = async (cid)=>{      
        try {
            let cart = await this.getById(cid)
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
                let cart = await this.getById(cid)
                
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
                await this.update(cart)
            } catch (error) {
                console.log(`Cannot add products: ${error}`)
            }
        }
    }

    deleteProductCart = async (cid, pid) => {
        let cart = await this.getById(cid)
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
        await this.update(cart)
        
    }

   

}

