import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import passport from "passport";
import swaggerUIExpress from 'swagger-ui-express'
import { Server as SocketServer } from "socket.io";
import initializePassport from "./config/passport.config.js";
import { specs } from "./config/swagger.config.js";
import config from './config/process.config.js'
import __dirname from "./utils.js";
import initializeSocket from "./websocket/chat.socket.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import ordersRouter from "./routes/orders.router.js";

let admin = true //crear usuario admin

//inicializamos express
const app = express();
const PORT = config.app.PORT;
export const server = app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});

//common midldlewares
app.use(cors())
app.use(express.json());
app.use(express.static(__dirname+'/public'));
app.use(cookieParser())

//passport sin session
initializePassport();
app.use(passport.initialize());

//socket
const io = new SocketServer(server, {
    cors:{
        origin: 'http://localhost:3000'
    }
})
initializeSocket(io)

//docs
app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))

//routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/orders', ordersRouter);

// const io = new SocketServer(server, {
//     cors:{
//         origin: config.app.CLIENT_URL
//     }
// })
// let messages = await chatService.getAll();

// io.on('connection', socket=> { 
   
//     // console.log('cliente conectado en socket' + socket.id)   
    
//     // socket.broadcast.emit('newUser')
//      socket.emit('messages',  messages );

//     socket.on('new-message',async (data) => {
//         await chatService.createChat(data)
//         let allMessages = await  chatService.getAll();
//         io.emit('messages', allMessages);
//     });
// })

export default admin


