import mongoose from "mongoose";
import MongoDBContainer from "./MongoContainer.js";
// import services from "../../dao/index.js";


const collection = 'orders';
const cartsSchema = mongoose.Schema ({
    buyer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'registeredUsers',
         require: true
    },
    products: {type: Array, require: true},
    total:{type:Number, require: true}
},{timestamps:true})

export default class Carts extends MongoDBContainer{
    constructor(){
        super(collection,cartsSchema)
    }
        
   
}