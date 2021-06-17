const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);

// suporte ao websocket o que permite comunicação em tempo real
// Resolvido problema de bloqueio com socket io
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
  });


// configurando mongodb
mongoose.connect('mongodb+srv://semana:semana@instaclone.7bpgm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true,
});

app.use((req, res, next)=>{
    req.io = io;

    next();
});

// todos os endereços podem acessar essa API
app.use(cors());

// fazendo com que quando for acessado a rota `/file` é acessado na vdd o caminho de uploads
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized',)))

app.use(require('./routes'));

server.listen(3333);