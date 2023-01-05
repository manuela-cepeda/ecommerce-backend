import config from '../config/process.config.js';
import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if(!token) return res.status(401).send({message:"Token requerido", auth:false});
    jwt.verify(token, config.jwt.SECRET, (err, user)=>{
        if(err) return res.status(403).send({error:err, auth:false});
        req.user = user;
        next();
    });
}