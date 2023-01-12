import mongoose from "mongoose";
import MongoDBContainer from "./MongoContainer.js";

const collection = 'chat';
const productsSchema = mongoose.Schema ({
    userId: {type: String, require: true},
    username: {type: Array, require: true},
    messages: {type: Array, require: true}, 
},{timestamps:true})

export default class Chat extends MongoDBContainer{
    constructor(){
        super(collection,productsSchema)
    }

    getByUserId = async (userId) => {
        let results = await this.model.findOne({  userId : userId });
    return results;
    }

}