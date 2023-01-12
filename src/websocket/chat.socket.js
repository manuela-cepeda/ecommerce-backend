import logger from '../config/pino.config.js';

//chat sin persistencia en memoria, intentando trabajar con distintas conversaciones (en proceso)

const initializeSocket = (io) =>{
    try{
        io.on('connection', async socket=> { 
            
         // notify existing users
        socket.broadcast.emit("user connected", {
            userId: socket.id,
            username:  socket.handshake.auth.author,
            messages: []
          });

            const users = []; 
            for (let [id, socket] of io.of("/").sockets) {
              const newUser = {
                userId: id,
                username:  socket.handshake.auth.author,
                messages: []
              }
              users.push(newUser);
              }
            socket.emit("users", users);

            socket.on("private-message", ({ msg, to }) => {
                socket.to(to).emit("private-message", {
                  msg,
                  from: socket.id,
                });
              })

              socket.on("disconnect", async () => {
                  socket.broadcast.emit("user-disconnected", {userId: socket.id});
              });

        })
    }catch(err){
        logger.error(` ${err.message}`); 
    }
   

}

export default initializeSocket;