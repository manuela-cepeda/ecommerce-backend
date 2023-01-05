import pkg from 'mongoose';
import admin from '../app.js'
import { ordersService } from '../services/services.js';

const { isValidObjectId } = pkg;

const getOrders =  async(req,res)=> {
    let results = await ordersService.getAll();
    res.send(results)
 }


 const getOrderById = async(req,res)=> {
    let id = req.params.id
    const isValid = isValidObjectId(id)
    if (!isValid) return res.status(400).send({error:"is not a valid id"}) 
    let result = await ordersService.getById(id)
    if(result == undefined ) return res.status(400).send({error:"order not found"});
     res.send(result)
 }

 const createOrder= async(req,res)=> {   
   console.log(req.body)
    const result = await ordersService.createOrder(req.body);
   console.log(result)
   //  await transporter.sendMail({
   //     from: 'ecotienda',
   //     to: 'manulcepeda@gmail.com', 
   //     subject:'nueva orden de compra',
   //     //text: //texto plano
   //     html:  `<div>Comprador: ${ user.fullName} </div>
   //     <div>producto: ${ user.age} </div>
   //      <div>Dirección: ${ user.adress} </div>
   //     <div>Email: ${ user.emsail} </div>
   //    <div>Tel: ${ user.tel} </div>`
   
   // })
    res.send(result)
 }

 const deleteOrderById =  async (req,res)=>{
    if(!admin)  return res.status(401).send({error:  "method 'DELETE' no authorized"})
   const id = req.params.id
   const isValid = isValidObjectId(id)
   if (!isValid) return res.status(400).send({error:"is not a valid id"}) 
   const product = await ordersService.getById(id)
   if (!product ) return res.status(400).send({error:"order doesn't exist"}) 
   await ordersService.deleteById(id)
   res.send({status:'success', message: 'order deleted'})
}


export default{
    getOrders,
    getOrderById, 
    createOrder,
    deleteOrderById,
}