// const {instrument} = require('@socket.io/admin-ui')
console.log('Server Started...')

const io = require('socket.io')(3000,{
    cors:{
        origin: ["http://localhost:8080" ,"https://5851-103-164-240-97.ngrok-free.app"]
    }
})
io.on('connection',socket=>{
    console.log(socket.id)
    socket.on("disconnect",()=>{
        socket.broadcast.emit('receive-msg','user disconnected...')
        // displayMessage(`You are connected with id: ${socket.id} `)
    })
    socket.on('send-msg', (message,room)=>{
                    //---------all sockets....
        // io.emit('receive-msg',message)     

                    //---------all sockets except sender...
        if(room===''){
            socket.broadcast.emit('receive-msg',message)
        } else{
            socket.to(room).emit('receive-msg',message)
            console.log(`${room}`)
        }
        
        
        
        // console.log(message)
    })
    
    socket.on('connect-msg',(msg)=>{
        socket.broadcast.emit('receive-msg',msg)
    })

    socket.on('join-room',(room,cb)=>{
        console.log(`working...`)
        socket.join(room)
        cb(`joined ${room}`)
    })
})