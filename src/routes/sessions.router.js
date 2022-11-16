import { Router } from "express";
import passport from 'passport'; 
import sessionController from "../controllers/session.controller.js";

const router = Router();


router.post('/register', passport.authenticate('register',{ failureRedirect:'registerfail'}), sessionController.register )

router.get('/registerfail', sessionController.registerFail  )

router.post('/login', passport.authenticate('login',{failureRedirect:'loginfail'}), sessionController.login )

router.get('/loginfail', sessionController.loginFail)

router.get('/logout', sessionController.logout)





export default router;