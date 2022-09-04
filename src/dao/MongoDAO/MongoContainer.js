import mongoose from "mongoose";

mongoose.connect('mongodb+srv://coderuser:ir8sc84OBJ89TNbJ@cluster0.awzpo36.mongodb.net/ecommerce?retryWrites=true&w=majority'
, err=>{
    if (err) throw new Error(`error conexion mongo atlas ${err}`)
    console.log('base conectada')
})

export default class MongoDBContainer{

    constructor(collection, schema){
        this.model =  mongoose.model(collection, schema)
    }
    
    getAll = async () => {      
        let results = await this.model.find();
        return results
  
    }
    
    getById = async (id) => {
        let results = await this.model.findOne({   _id : id });
        console.log( )
        return results;
    };
  
    save = async (document)=> {
        let results = await this.model.create(document);
        return results;
    }

    update = async ( modifiedItem) => {
        const id = modifiedItem.id
        let results = await this.model.updateOne({_id : id }, {$set: modifiedItem });
        return results;
    };

    deleteById = async (id) => {
        let results = await this.model.deleteOne({ _id : id });
        return results;
    };
  

   
  
}