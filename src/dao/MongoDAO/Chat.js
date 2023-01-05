import mongoose from "mongoose";
import MongoDBContainer from "./MongoContainer.js";

const collection = 'chat';
const productsSchema = mongoose.Schema ({
    authorId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'registeredUsers',
         require: true
        },
    authorName: {type: String, require: true},
    msg: {type: String, require: true}, 
},{timestamps:true})

export default class Chat extends MongoDBContainer{
    constructor(){
        super(collection,productsSchema)
    }

    

}