import { UserPresenterDTO } from "../dao/DTO/UserDTO.js";
import { transporter } from "../utils.js";
import jwt from "jsonwebtoken";
import config from '../config/process.config.js'
import logger from "../config/pino.config.js";


const register = async (req, res) => {
    try {
        const user = new UserPresenterDTO(req.user);
         await transporter.sendMail({
            from: 'ecotienda',
            to: `${ user.email}`, 
            subject:'mail de muestra - nuevo registro',
            //text: //texto plano
            html:  `<div>Nombre: ${ user.fullName} </div>
            <div>Edad: ${ user.age} </div>
             <div>Dirección: ${ user.adress} </div>
            <div>Email: ${ user.email} </div>
           <div>Tel: ${ user.tel} </div>`
        
        })
          
         res.send({success: true, payload:  req.user})
    } catch (error) {
        logger.error('error register' + error)
    }
}

const registerFail = (req,res)=>{
    try {       
        res.status(500).send({status:'error', error:"error"})
    } catch (error) {
        logger.error('error registerFail' + error)
    }
}

const login = async (req, res, next) => {
    try {       
        if(!req.user)  res.status(500).send({success: false, status:"error",error:"Error in login "})
        
        const loginUser = {
            id: req.user?._id,
            name: req.user?.name,
            email: req.user?.email,
            role: req.user?.role
        } 
        const token = jwt.sign(loginUser, config.jwt.SECRET, {expiresIn:100})
        res.cookie(config.jwt.COOKIE, token, {maxAge:300000, httpOnly:true}).status(200)
        .send({success: true, payload: loginUser, token: token})
    } catch (error) {
        logger.error('error login' + error)
    }
    
}

const loginGoogle =  (req,res)=>{
    try {       
        if(!req.user)  res.status(500).send({success: false, status:"error",error:"Error in login "})
    
        const loginUser = {
          id: req.user?._id,
          name: req.user?.name,
          email: req.user?.email
      } 
      const token = jwt.sign(loginUser, config.jwt.SECRET, {expiresIn:300})
      
      res.cookie(config.jwt.COOKIE, token, {maxAge:30000,  httpOnly: false, secure:false }) 
      res.redirect(config.app.CLIENT_URL)
    } catch (error) {
        logger.error('error loginGoogle' + error)
    }
  }

const loginFail = (req,res)=>{
    try {       
        res.status(500).send({status:"error",error:"Error in login "})
    } catch (error) {
        logger.error('error loginFail' + error)
    }
}

const isUserAuth = (req,res)=>{
    try {       
        res.status(200).send({ auth: true, user: req.user})
    } catch (error) {
        logger.error('error isUserAuth' + error)
    }
}

export default{
    register,
    registerFail,
    login,
    loginGoogle,
    loginFail,
    isUserAuth
}