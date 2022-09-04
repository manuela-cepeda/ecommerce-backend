import __dirname, { codeGenerator } from "../../utils.js";
import FilesContainer from "./FilesContainer.js";

const path = __dirname + '/files/productos.json';

export default class Products extends FilesContainer{
    constructor(){
        super(path)
    }
    
    createProduct = async(obj)  =>{  
        try{
            const data = await this.getAll();
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

