import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import __dirname from "./utils.js";
import cors from 'cors'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import config from './config/process.config.js'

 let admin = true

//inicializamos express
const app = express();
const PORT = config.app.PORT;
// const PORT =  process.env.PORT || 8080 ;
const server = app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});

app.use(cors())
app.use(express.json());
app.use(express.static(__dirname+'/public'));

//session
app.use(session({
	store: MongoStore.create({
		mongoUrl: config.mongo.MONGO_URL, 
		// mongoUrl: process.env.MONGO_URL, 
		ttl:600, 
	}),
	secret: "C0derSessi0n3000",
	resave: false, 
	saveUninitialized: false
}))

//passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());



//routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);




export default admin


