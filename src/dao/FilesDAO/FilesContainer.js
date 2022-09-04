import fs from "fs";


export default class FilesContainer {
    constructor(path){
        this.path = path
    }

    getAll = async()=> {
        try{
            if(fs.existsSync(this.path)){
                let fileData = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(fileData)
            }else{
                return [];
            }
        }
        catch(err){
            console.log(`Cannot read file: ${err}`)
        }
    }

    getById= async(id) => {
        try {
            const data = await this.getAll();
            return data.find((item) => item.id == parseInt(id));
            
        } catch (err) {
            console.log(`Cannot find by id: ${err}`)
        }
    }

    deleteById= async(id) => {
        try {
            const data = await this.getAll();
            let findedItem = data.find((item) => item.id == parseInt(id));
            const newArray = data.filter((item) => item.id != parseInt(id));
            await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, '\t'));
            if (findedItem) {
                await fs.promises.writeFile(this.path, JSON.stringify(newItems, null, "\t"));
                console.log(`Se ha eliminado el siguiente item: ${findedItem}`);
              } else {
                console.log(`El id "${id}" no existe!`);
              }
        } catch (err) {
            console.log(`Cannot delete by id: ${err}`)
            throw new Error
        }
    }

    save = async (obj) => {
        let data = await this.getAll();
        data.push(obj);
        await fs.promises.writeFile(this.path, JSON.stringify(data, null, "\t"));
        return obj.id;
      };

    update = async (obj) => {
    let data = await this.getAll();
    obj.id = parseInt( obj.id)
    let index = data.findIndex((item) => item.id === obj.id);
    data[index] = obj;
    await fs.promises.writeFile(this.path, JSON.stringify(data, null, "\t"));
    return true;
    };
   
}