import pkg from 'mongoose';
import logger from "../config/pino.config.js";
import admin from '../app.js'
import { chatService } from '../services/services.js';

const { isValidObjectId } = pkg;

const getChats =  async(req,res)=> {
   try {
      let results = await chatService.getAll();
      res.send(results)
   } catch (error) {
      logger.error('error getChats' + error)
   }
 }


 const getChatById = async(req,res)=> {
   try {
      
      let id = req.params.id
      const isValid = isValidObjectId(id)
      if (!isValid) return res.status(400).send({error:"is not a valid id"}) 
      let result = await chatService.getById(id)
      if(result == undefined ) return res.status(400).send({error:"chat no encontrado"});
       res.send(result)
   } catch (error) {
      logger.error('error getChatById' + error)
   }
 }

 const createChat = async(req,res)=> {   
      try {
         const result = await chatService.createChat(req.body);
         res.send(result)
      } catch (error) {
         logger.error('error createChat' + error)
      }
 }

 const deleteChatById =  async (req,res)=>{
   try {
      if(!admin)  return res.status(401).send({error:  "method 'DELETE' no authorized"})
     const id = req.params.id
     const isValid = isValidObjectId(id)
     if (!isValid) return res.status(400).send({error:"is not a valid id"}) 
     const product = await chatService.getById(id)
     if (!product ) return res.status(400).send({error:"chat doesn't exist"}) 
     await chatService.deleteById(id)
     res.send({status:'success', message: 'chat deleted'})
   } catch (error) {
      logger.error('error deleteChatById' + error)
   }
}


export default{
    getChats,
    getChatById, 
    createChat,
    deleteChatById,
}