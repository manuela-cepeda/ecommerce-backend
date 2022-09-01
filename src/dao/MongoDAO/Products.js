import mongoose from "mongoose";
import MongoDBContainer from "./MongoContainer.js";

const collection = 'products';
const productsSchema = mongoose.Schema ({
    title: {type: String, require: true},
    price: {type: Number, require: true},
    stock: {type: Number, require: true},
    code: {type: String, require: true},
    thumbnail: String   
},{timestamps:true})

export default class Products extends MongoDBContainer{
    constructor(){
        super(collection,productsSchema)
    }
}