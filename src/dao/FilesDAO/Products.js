import __dirname from "../../utils.js";
import FilesContainer from "./FilesContainer.js";
import fs from "fs";


const path = __dirname + '/files/productos.json';

export default class Products extends FilesContainer{
    constructor(){
        super(path)
    }
    
    save= async(obj)  =>{  
        try{
            const data = await this.getAll();
            obj.timestamp = Date.now().toLocaleString()
            // obj.code = this.codeGenerator(data)
            if (data.length === 0 ) {
                obj.id = 1;
                data.push(obj);
                await fs.promises.writeFile(path, JSON.stringify(data, null, '\t'));               
            } else {   
                obj.id =  data[data.length-1].id+1 ;
                data.push(obj);
                await fs.promises.writeFile(path, JSON.stringify(data, null, '\t'));
                
            }
            return obj.id
        }
        catch(err){
            console.log(`Cannot write file: ${err}`)
        } 
      
    }

    //chequear - falta comprobar que el id exista
    update = async(id, obj) =>{
        let arr = await this.getAll()        
        let title = obj.title;
        let price = obj.prices;
        let stock = obj.stock;
        let code = obj.code;
        let thumbnail = obj.thumbnail;
        arr.map((data)=> {
            if(data.id == id){
                data.title = title;
                data.prices = price;
                data.thumbnail = thumbnail;
                data.stock = stock;
                data.code = code;
            }
        })
        await fs.promises.writeFile(path,JSON.stringify(arr,null,'\t'));
        
        return arr;
    }

    // codeGenerator =  (products) => {
    //     let code = ''
    //     do {
    //         code = Math.random().toString(36).substring(5)
    //     } while (products.find(item => item.code === code))
    //     return code
    // }
}

