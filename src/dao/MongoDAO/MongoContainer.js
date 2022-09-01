import mongoose from "mongoose";

export default class MongoDBContainer{
    constructor(collection, schema){
        mongoose.connect('mongodb+srv://coderuser:ir8sc84OBJ89TNbJ@cluster0.awzpo36.mongodb.net/ecommerce?retryWrites=true&w=majority'
        , err=>{
            if (err) throw new Error(`error conexion mongo atlas ${err}`)
            console.log('base conectada')
        })
        this.model =  mongoose.model(collection, schema)
    }
    
    getAll = async () => {
        let results = await this.model.find();
        return results
    }
    save = async (document)=> {
        let results = await this.model.create(document);
        return results;
    }

    getById = async (id) => {
        let results = await this.model.find({id});
        return results;
    };
  
    deleteById = async (id) => {
        let results = await this.model.deleteOne({id});
        return results;
    };
  
  
    update = async (id, modifiedItem) => {
        let results = await this.model.updateOne({id}, {$set: modifiedItem });
        return results;
    };
  
}