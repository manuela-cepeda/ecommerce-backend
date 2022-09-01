export default class MemoryContainer {
    constructor(){
        this.data = []
    }
    getAll = () => {
        return this.data;

    }

    getById = (id) => {
        return this.data.find((element) => element.id == id);
    }

    deleteById = (id) => {
        const newArray = this.data.filter((element) => element.id != id);
        return   this.data =  newArray
    }
    
    save = (element) => {

        if (this.data.length === 0 ) {
            element.id = 1;
             this.data.push(element);
        } else {   
            element.id =  this.data[this.data.length-1].id+1 ;
            this.data.push(element);
            
        }
        return element;
    }



   
}