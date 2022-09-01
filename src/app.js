import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import __dirname from "./utils.js";



 let admin = true

//inicializamos express
const app = express();
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});

app.use(express.json());
app.use(express.static(__dirname+'/public'));



app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);




export default admin


