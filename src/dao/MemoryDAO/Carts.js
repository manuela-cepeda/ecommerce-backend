import MemoryContainer from "./MemoryContainer.js";

export default class Carts extends MemoryContainer {

    createCart = async ()=>{
        let data =  this.getAll()
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

    
    addProductCart =  (cid, pid, qty) => {
        try {
            let cart =  this.getById(parseInt(cid))
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
             this.update( cart)
        } catch (error) {
            console.log(`Cannot add products: ${error}`)
        }
        
    }

    deleteProductCart =  (cid, pid) => {
        let cart =  this.getById(parseInt(cid))
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
         this.update(cart)
        
    }
}