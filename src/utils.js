import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer'
import config from './config/process.config.js';


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

// nodemailer 
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'manulcepeda@gmail.com',
        pass: config.google.PASS_NODEMAILER
    }
});


export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)
export const uploader = multer({storage})
export default __dirname;
