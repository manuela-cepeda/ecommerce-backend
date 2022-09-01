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
            return data.find((element) => element.id == id);
            
        } catch (err) {
            console.log(`Cannot find by id: ${err}`)
        }
    }

    deleteById= async(id) => {
        try {
            const data = await this.getAll();
            const newArray = data.filter((element) => element.id != id);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, '\t'));
            
        } catch (err) {
            console.log(`Cannot delete by id: ${err}`)
        }
    }

   
}