
export default class CartsRepository {
    constructor(dao){
        this.dao = dao;
    }

    getAll = async () => {
        return this.dao.getAll()
    };

    getById = async (id) => {
        return this.dao.getById(id)
    };


    deleteById = async (id) => {
        return this.dao.deleteById(id)
    };
        
    createCart = async ()=>{
        let cart={}
        cart.products = []
        return this.dao.save(cart)
        
    }

    
    addProductCart = async (cid, pid, qty) => {
        try {
            let cart = await this.dao.getById(cid);
            if(cart.products?.some(e =>e.pid === pid)){                    
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
            await this.dao.update(cart)
        } catch (error) {
            console.log(`Cannot add products: ${error}`)
        }
        
    }

    deleteProductCart = async (cid, pid) => {
        let cart = await this.dao.getById(cid);
        let newCartProduts = []
        if(cart.products?.some(e =>e.pid === pid)){
            for (const item of cart.products){
                if(item.pid === pid){
                    continue
                }
                newCartProduts.push(item)
            }
        }
        cart.products = newCartProduts
        await this.dao.update(cart)
        
    }

   
}