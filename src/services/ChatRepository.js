
export default class ChatRepository {
    constructor(dao){
        this.dao = dao;
    }


    createChat = async(obj)  =>{  
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