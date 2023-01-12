import { Router } from "express";
import config from "../config/process.config.js";


const router = Router();

router.get('/',  async (req, res)=>{  
    res.render('info', {info: config})
   
})


export default router 