import { Router } from "express";
import passport from 'passport'; 
import sessionController from "../controllers/session.controller.js";
import  {verifyToken} from "../middlewares/veryfytoken.js";


const router = Router();

router.post('/register', passport.authenticate('register',{session:false, failureRedirect:'registerfail'}), sessionController.register )

router.get('/registerfail', sessionController.registerFail  )

router.post('/login', passport.authenticate('login',{session:false, failureRedirect:'loginfail'}), sessionController.login )

router.get('/loginfail', sessionController.loginFail)

router.get('/isUserAuth', verifyToken, sessionController.isUserAuth )

router.get('/google', passport.authenticate('google',{session:false, scope: ['email','profile']}), (req,res)=>{})

router.get('/googlecallback', passport.authenticate('google', { session:false}), sessionController.loginGoogle)

export default router;