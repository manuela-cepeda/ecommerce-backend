import __dirname from "../../utils.js";
import FilesContainer from "./FilesContainer.js";



const path = __dirname + '/files/carts.json';

export default class Carts extends FilesContainer{
    constructor(){
        super(path)
    }
    
    createCart = async ()=>{
        let data = await this.getAll()
        let cart={}
        if (data.length === 0) {
            cart.id = 1
            cart.timeStamp = Date.now().toLocaleString()
        }else{
            cart.id= data[data.length - 1].id + 1
            cart.timeStamp = Date.now().toLocaleString()
        }
        cart.products = []
        this.save(cart)
       
    }

    
    addProductCart = async (cid, pid, qty) => {
        try {
            let cart = await this.getById(parseInt(cid))
            if(cart.products.some(e =>e.pid === parseInt(pid))){                    
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
            await this.update( cart)
        } catch (error) {
            console.log(`Cannot add products: ${error}`)
        }
        
    }

    deleteProductCart = async (cid, pid) => {
        let cart = await this.getById(parseInt(cid))
        let newCartProduts = []
        if(cart.products.some(e =>e.pid === parseInt(pid))){
            for (const item of cart.products){
                if(item.pid === parseInt(pid)){
                    continue
                }
                newCartProduts.push(item)
            }
        }
        cart.products = newCartProduts
        await this.update(cart)
        
    }
   

}

