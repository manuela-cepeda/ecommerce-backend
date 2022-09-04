import MemoryContainer from "./MemoryContainer.js";
import { codeGenerator } from "../../utils.js";

export default class Products extends MemoryContainer {
    createProduct = (obj)  =>{  
        try{
            const data =  this.getAll();
            obj.timestamp = Date.now().toLocaleString()
            obj.code = codeGenerator(data)
            if (data.length === 0 ) {
                obj.id = 1;
                this.save(obj)
            } else {   
                obj.id =  data[data.length-1].id+1 ;
                this.save(obj)
            }
            return obj.id
        }
        catch(err){
            console.log(`Cannot write file: ${err}`)
        } 
    }
}