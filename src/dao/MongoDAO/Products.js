import mongoose from "mongoose";
import { codeGenerator } from "../../utils.js";
import MongoDBContainer from "./MongoContainer.js";

const collection = 'products';
const productsSchema = mongoose.Schema ({
    name: {type: String, require: true},
    href: {type: String, require: true},
    imageSrc: {type: String, require: true},
    imageAlt: {type: String, require: true},
    size: {type: String, require: true},
    price: {type: Number, require: true},
    stock: {type: Number, require: true},
    category: {type: Number, require: true},
    code: {type: String, require: true},
    thumbnail: String   
},{timestamps:true})

export default class Products extends MongoDBContainer{
    constructor(){
        super(collection,productsSchema)
    }

    createProduct = async(obj)  =>{  
        const data = await this.getAll();
        obj.code = codeGenerator(data)
        this.save(obj)
    }
}