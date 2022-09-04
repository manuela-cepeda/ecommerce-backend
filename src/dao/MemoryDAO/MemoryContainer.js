export default class MemoryContainer {
    constructor(){
        this.data = []
    }

    getAll = () => {
        return this.data;

    }

    getById = (id) => {
        return this.data.find((element) => element.id == parseInt(id));
    }

    deleteById = (id) => {
        const data =  this.getAll();
        let findedItem = data.find((item) => item.id == parseInt(id));
        const newArray = this.data.filter((element) => element.id != parseInt(id));
        if (findedItem) {
            this.data = newArray
            console.log(`Se ha eliminado el siguiente item: ${findedItem}`);
          } else {
            console.log(`El id "${id}" no existe!`);
          }
    }
    
    save = (obj) => {
        let data =  this.getAll();
        data.push(obj);
        return obj.id;;
    }


    update =  (obj) => {
        let data =  this.getAll();
        obj.id = parseInt( obj.id)
        let index = data.findIndex((item) => item.id === obj.id);
        data[index] = obj;
        return true;
        };
   
}