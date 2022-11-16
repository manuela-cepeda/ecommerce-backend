
export default class UserRepository {
    constructor(dao){
        this.dao = dao;
    }
    
    save = async (user) => {
        return this.dao.save(user)
    }
   getById= async (id) => {
        return this.dao.getById(id)
    };
    
    getByEmail = async (email) => {
        return this.dao.getByEmail(email)
    };
    
  
}