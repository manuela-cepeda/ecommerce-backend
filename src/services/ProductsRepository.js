import { codeGenerator } from "../utils.js";

export default class ProductsRepository {
    constructor(dao){
        this.dao = dao;
    }


    createProduct = async(obj)  =>{  
        const data = await this.dao.getAll();
        obj.code = codeGenerator(data)
        this.dao.save(obj)
    }

    getAll = async () => {
        return this.dao.getAll()
    };

    getById = async (id) => {
        return this.dao.getById(id)
    };

    deleteById = async (id) => {
        return this.dao.deleteById(id)
    };

    update = async (product) => {
        return this.dao.update(product)
    };
   
    
}