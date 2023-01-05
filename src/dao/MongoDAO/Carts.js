import mongoose from "mongoose";
import MongoDBContainer from "./MongoContainer.js";
// import services from "../../dao/index.js";


const collection = 'carts';
const cartsSchema = mongoose.Schema ({
    buyer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'registeredUsers',
         require: true
        }, 
    products: {type: Array, require: true},
},{timestamps:true})

export default class Carts extends MongoDBContainer{
    constructor(){
        super(collection,cartsSchema)
    }

    getByUserId = async (id) => {
        let results = await this.model.findOne({  buyer : id });
    return results;
};
        
   
}