import mongoose from "mongoose";
import MongoDBContainer from "./MongoContainer.js";

const collection = 'registeredUsers';

const userSchema = mongoose.Schema ({
    email: {type: String, require: true}, 
    name:  {type: String, require: true}, 
    lastName:  {type: String, require: true}, 
    adress:  {type: String, require: true}, 
    age:  {type: String, require: true}, 
    tel:  {type: String, require: true}, 
    // avatar:  {type: String, require: true},  //url
    password:  {type: String, require: true}  
},{timestamps:true})

export default class User extends MongoDBContainer{
    constructor(){
        super(collection,userSchema)
    }
    
 
    
  
}