import logger from '../config/pino.config.js';
import { chatService } from '../services/services.js';


let messages = await chatService.getAll();

const initializeSocket = (io) =>{
    try{
        io.on('connection', socket=> { 
       
            // console.log('cliente conectado en socket' + socket.id)   
            // socket.broadcast.emit('newUser')
             socket.emit('messages',  messages );
        
            socket.on('new-message',async (data) => {
                await chatService.createChat(data)
                let allMessages = await  chatService.getAll();
                io.emit('messages', allMessages);
            });
        })
    }catch(err){
        logger.error(` ${err.message}`); 
    }
   

}

export default initializeSocket;