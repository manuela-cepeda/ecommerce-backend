import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import passport from "passport";
import handlebars from "express-handlebars"
import swaggerUIExpress from 'swagger-ui-express'
import { Server as SocketServer } from "socket.io";
import __dirname from "./utils.js";
import initializePassport from "./config/passport.config.js";
import { specs } from "./config/swagger.config.js";
import config from './config/process.config.js'
import initializeSocket from "./websocket/chat.socket.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import ordersRouter from "./routes/orders.router.js";
import viewsRouter from "./routes/views.router.js";
import config from "./config/process.config.js";


// express
const app = express();
const PORT = process.env.PORT || 8080;
export const server = app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});

//common midldlewares
app.use(cors())
app.use(express.json());
app.use(express.static(__dirname+'/public'));
app.use(cookieParser())

// template engine config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');


//passport sin session
initializePassport();
app.use(passport.initialize());

//websocket
const io = new SocketServer(server, {
    cors:{
        origin: config.app.CLIENT_URL
    }
})

initializeSocket(io)

//docs
app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))

//routes
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/orders', ordersRouter);



