
export default class UserService {
    constructor(dao){
        this.dao = dao;
    }
    
    save = async (user) => {
        return this.dao.save(user)
    }
    
    getByEmail = async (email) => {
        return this.dao.getByEmail(email)
    };
    
  
}