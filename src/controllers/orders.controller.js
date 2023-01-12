import pkg from 'mongoose';
import logger from "../config/pino.config.js";
import { ordersService } from '../services/services.js';
import { transporter } from '../utils.js';

const { isValidObjectId } = pkg;

const getOrders =  async(req,res)=> {
   try {
      let results = await ordersService.getAll();
      res.send(results)
  } catch (error) {
      logger.error('error getOrders' + error)
  }
 }


 const getOrderById = async(req,res)=> {
   try {
      let id = req.params.id
      const isValid = isValidObjectId(id)
      if (!isValid) return res.status(400).send({error:"is not a valid id"}) 
      let result = await ordersService.getById(id)
      if(result == undefined ) return res.status(400).send({error:"order not found"});
       res.send(result)
   } catch (error) {
      logger.error('error getOrderById' + error)
   }
 }

 const createOrder= async(req,res)=> {   
   try {
      const result = await ordersService.createOrder(req.body);
      console.log(result)
      await transporter.sendMail({
         from: 'ecotienda',
         to: `${ result.buyer}`,
         subject:'mail de muestra - nueva orden de compra',
         html:  `<div>Comprador: ${ result.buyer} </div>
         <div>productos:
         ${result.products.map(element => {
           return (`${element.qty} unidad de ${element.name}`)
      })}
          </div>      
         <div>total: ${ result.total} </div>`
     
     })
      res.send(result)
   } catch (error) {
      logger.error('error createOrder' + error)
   }
 }

 const deleteOrderById =  async (req,res)=>{
   try {
     const id = req.params.id
     const isValid = isValidObjectId(id)
     if (!isValid) return res.status(400).send({error:"is not a valid id"}) 
     const product = await ordersService.getById(id)
     if (!product ) return res.status(400).send({error:"order doesn't exist"}) 
     await ordersService.deleteById(id)
     res.send({status:'success', message: 'order deleted'})
   } catch (error) {
      logger.error('error deleteOrderById' + error)
   }
}


export default{
    getOrders,
    getOrderById, 
    createOrder,
    deleteOrderById,
}