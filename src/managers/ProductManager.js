
import fs from "fs";
import __dirname from "../utils.js";

const path =__dirname+'/files/productos.json';

export class ProductManager {

    



    
    update = async(obj, id) =>{
        let arr = await this.getAll()        
        let title = obj.title;
        let price = obj.prices;
        let thumbnail = obj.thumbnail;
        arr.map((data)=> {
            if(data.id == id){
                data.title = title;
                data.prices = price;
                data.thumbnail = thumbnail;
            }
        })
        await fs.promises.writeFile(path,JSON.stringify(arr,null,'\t'));
        console.log(arr)
        return arr;
    }
   

    codeGenerator =  (products) => {
        let code = ''
        do {
            code = Math.random().toString(36).substring(5)
        } while (products.find(item => item.code === code))
        return code
    }
} 


