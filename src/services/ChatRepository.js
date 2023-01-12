
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

    getByUserId = async (userId) => {
        return this.dao.getByUserId(userId)
    };

    deleteById = async (id) => {
        return  this.dao.deleteById(id)
    };

    update = async (chat) => {
        return this.dao.update(chat)
    };
       
}