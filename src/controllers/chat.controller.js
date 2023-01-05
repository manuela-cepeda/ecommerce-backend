import pkg from 'mongoose';
import admin from '../app.js'
import { chatService } from '../services/services.js';

const { isValidObjectId } = pkg;

const getChats =  async(req,res)=> {
    let results = await chatService.getAll();
    res.send(results)
 }


 const getChatById = async(req,res)=> {
    let id = req.params.id
    const isValid = isValidObjectId(id)
    if (!isValid) return res.status(400).send({error:"is not a valid id"}) 
    let result = await chatService.getById(id)
    if(result == undefined ) return res.status(400).send({error:"chat no encontrado"});
     res.send(result)
 }

 const createChat = async(req,res)=> {   
    const result = await chatService.createChat(req.body);
    res.send(result)
 }

 const deleteChatById =  async (req,res)=>{
    if(!admin)  return res.status(401).send({error:  "method 'DELETE' no authorized"})
   const id = req.params.id
   const isValid = isValidObjectId(id)
   if (!isValid) return res.status(400).send({error:"is not a valid id"}) 
   const product = await chatService.getById(id)
   if (!product ) return res.status(400).send({error:"chat doesn't exist"}) 
   await chatService.deleteById(id)
   res.send({status:'success', message: 'chat deleted'})
}


export default{
    getChats,
    getChatById, 
    createChat,
    deleteChatById,
}