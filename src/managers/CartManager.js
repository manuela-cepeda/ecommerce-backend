import fs from "fs";
import __dirname from "../utils.js";
import  {ProductManager}  from '../managers/ProductManager.js';


const path =__dirname+'/files/carts.json';
const productService=  new ProductManager();


export class CartManager {       

    getAll= async()=> {
        try{
            if(fs.existsSync(path)){
                let fileData = await fs.promises.readFile(path, 'utf-8');
                return JSON.parse(fileData)
            }else{
                return [];
            }
        }
        catch(err){
            console.log(`Cannot read file: ${err}`)
           
        }
    }

    getById= async(cid) => {
        try {
            const data = await this.getAll();
            return data.find((element) => element.cid == cid);
            
        } catch (err) {
            console.log(`Cannot find by id: ${err}`)
        }
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
                    product:await productService.getById(item?.pid),
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
        let product = await productService.getById(pid)
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
                await this.updateCarts(cart)
            } catch (error) {
                console.log(`Cannot add products: ${error}`)
            }
        }
    }


    deleteById= async(cid) => {
        try {
            const data = await this.getAll();
            const newArray = data.filter((element) => element.cid != cid);
            await fs.promises.writeFile(path, JSON.stringify(newArray, null, '\t'));
            
        } catch (err) {
            console.log(`Cannot delete by id: ${err}`)
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
        await this.updateCarts(cart)
        
    }
   
    
    updateCarts = async(cart) =>{
        let arr = await this.getAll()        
       
        arr.map((data)=> {
            if(data.cid === cart.cid){
                data.timeStamp = cart.timeStamp;
                data.products = cart.products;
            }
        })
        await fs.promises.writeFile(path,JSON.stringify(arr,null,'\t'));
        console.log(arr)
        return arr;
    }
    
   
} 


