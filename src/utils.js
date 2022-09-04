import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, __dirname+'/public/img')
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+'-'+file.originalname)
    }
})

export function  codeGenerator  (products)  {
    let code = ''
    do {
        code = Math.random().toString(36).substring(5)
    } while (products.find(item => item.code === code))
    return code
}

export const uploader = multer({storage})
export default __dirname;
