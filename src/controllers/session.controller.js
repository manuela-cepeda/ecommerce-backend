import { UserPresenterDTO } from "../dao/DTO/UserDTO.js";
import { transporter } from "../utils.js";
import jwt from "jsonwebtoken";
import config from '../config/process.config.js'

const register = async (req, res) => {
    const user = new UserPresenterDTO(req.user);
     await transporter.sendMail({
        from: 'ecotienda',
        to: 'manulcepeda@gmail.com', 
        subject:'nuevo registro',
        //text: //texto plano
        html:  `<div>Nombre: ${ user.fullName} </div>
        <div>Edad: ${ user.age} </div>
         <div>Dirección: ${ user.adress} </div>
        <div>Email: ${ user.emsail} </div>
       <div>Tel: ${ user.tel} </div>`
    
    })
      
     res.send({success: true, payload:  req.user})
}

const registerFail = (req,res)=>{
    res.status(500).send({status:'error', error:"error"})
}

const login = async (req, res, next) => {
    if(!req.user)  res.status(500).send({success: false, status:"error",error:"Error in login "})
   
    const loginUser = {
        id: req.user?._id,
        name: req.user?.name,
        email: req.user?.email
    } 
    const token = jwt.sign(loginUser, config.jwt.SECRET, {expiresIn:100})
    res.cookie(config.jwt.COOKIE, token, {maxAge:300000, httpOnly:true}).status(200)
    .send({success: true, payload: loginUser, token: token})
}

const loginGoogle =  (req,res)=>{
    if(!req.user)  res.status(500).send({success: false, status:"error",error:"Error in login "})

    const loginUser = {
      id: req.user?._id,
      name: req.user?.name,
      email: req.user?.email
  } 
  const token = jwt.sign(loginUser, config.jwt.SECRET, {expiresIn:100})
  
  res.cookie(config.jwt.COOKIE, token, {maxAge:30000}) 
  res.redirect(config.app.CLIENT_URL)
  }

const loginFail = (req,res)=>{
    res.status(500).send({status:"error",error:"Error in login "})
}

const isUserAuth = (req,res)=>{ res.status(200).send({ auth: true, user: req.user})}

export default{
    register,
    registerFail,
    login,
    loginGoogle,
    loginFail,
    isUserAuth
}