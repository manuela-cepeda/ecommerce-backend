import { UserPresenterDTO } from "../dao/DTO/UserDTO.js";
import { transporter } from "../utils.js";

const register = async (req, res) => {
    console.log(req.user)
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

const login = async (req, res) => {
    req.session.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }  
    res.status(200).send({success: true, payload: req.session.user})
     
}

const loginFail = (req,res)=>{
    res.status(500).send({status:"error",error:"Error in login "})
}

const logout = async (req,res)=>{
	req.session.destroy(err=>{
		if(!err) res.send({success: true, payload: 'log out'})
		else res.send({status: 'Logout ERROR' ,body:err})
	})
}


export default{
    register,
    registerFail,
    login,
    loginFail, 
    logout
}