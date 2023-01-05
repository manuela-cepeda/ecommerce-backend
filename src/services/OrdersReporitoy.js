
export default class OrdersRepository {

    constructor(dao){
        this.dao = dao;
    }
   
    createOrder= async(obj)  =>{  
        return this.dao.save(obj)
     }
 
     getAll = async () => {
         return this.dao.getAll()
     };
 
     getById = async (id) => {
         return this.dao.getById(id)
     };
 
     deleteById = async (id) => {
         return  this.dao.deleteById(id)
     };

   
}