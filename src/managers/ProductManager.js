
import fs from "fs";
import __dirname from "../utils.js";

const path =__dirname+'/files/productos.json';

export class ProductManager {

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

    save= async(product)  =>{  
        try{
            const data = await this.getAll();
            product.timestamp = Date.now().toLocaleString()
            product.code = this.codeGenerator(data)
            if (data.length === 0 ) {
                product.id = 1;
                data.push(product);
                await fs.promises.writeFile(path, JSON.stringify(data, null, '\t'));               
            } else {   
                product.id =  data[data.length-1].id+1 ;
                data.push(product);
                await fs.promises.writeFile(path, JSON.stringify(data, null, '\t'));
                
            }
            return product.id
        }
        catch(err){
            console.log(`Cannot write file: ${err}`)
        } 
      
    }

    getById= async(id) => {
        try {
            const data = await this.getAll();
            return data.find((element) => element.id == id);
            
        } catch (err) {
            console.log(`Cannot find by id: ${err}`)
        }
    }

    deleteById= async(id) => {
        try {
            const data = await this.getAll();
            const newArray = data.filter((element) => element.id != id);
            await fs.promises.writeFile(path, JSON.stringify(newArray, null, '\t'));
            
        } catch (err) {
            console.log(`Cannot delete by id: ${err}`)
        }
    }

    deleteAll= async() => {
        try {           
            await fs.promises.writeFile(path, JSON.stringify([], null, '\t'));
            
        } catch (err) {
            console.log(`Cannot delete all: ${err}`)
        }
    }
    
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


