import { Router } from "express";
import passport from 'passport'; 
import { transporter } from "../utils.js";

const router = Router();


router.post('/register', passport.authenticate('register',{ failureRedirect:'registerfail'}), async (req, res) => {

    let result = await transporter.sendMail({
        from: 'ecotienda',
        to: 'manulcepeda@gmail.com', 
        subject:'nuevo registro',
        //text: //texto plano
        html:  `<div>Nombre: ${ req.user.name} </div>
        <div>Edad: ${ req.user.age} </div>
         <div>Dirección: ${ req.user.adress} </div>
        <div>Email: ${ req.user.email} </div>
       <div>Tel: ${ req.user.tel} </div>`
    
    })
    console.log(req.user)

     res.send({success: true, payload:  req.user})
})

router.get('/registerfail', (req,res)=>{
    res.status(500).send({status:'error', error:"error"})
})

router.post('/login', passport.authenticate('login',{failureRedirect:'loginfail'}), async (req, res) => {
    req.session.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }  
    res.status(200).send({success: true, payload: req.session.user})
     
})

router.get('/loginfail',(req,res)=>{
    res.status(500).send({status:"error",error:"Error in login "})
})

router.get('/logout', async (req,res)=>{
	req.session.destroy(err=>{
		if(!err) res.send({success: true, payload: 'log out'})
		else res.send({status: 'Logout ERROR' ,body:err})
	})
})





export default router;