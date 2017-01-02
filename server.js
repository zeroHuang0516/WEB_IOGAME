import path from 'path';
import express from 'express';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import http from 'http';
//import mongoose from 'mongoose';
import config from './webpack.config';
import dbConfigFile from './config/config';
import { Router } from 'express';
import UUID from 'node-uuid';

const router = new Router();


const app = express();
var server = http.createServer(app);
var io = require('socket.io');
const dbConfig = dbConfigFile[process.env.NODE_ENV];
var debug = false;

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/blog');
//mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);

const port = process.env.PORT || 3300;


const compiler = webpack(config);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
}));

//app.use('/api', api);

app.get('/', (req, res) =>{
  console.log('Loading %s',__dirname + 'index.html');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/*', function(req, res, next) {
    var file = req.params[0];
    if (debug) console.log('File requested: ' + file);
    res.sendFile(__dirname + '/' + file);
});

var users = [];
var TotalUsrs = [];
var games = [];
var gameCount = 0;






router.get('/',(req,res)=>{
  res.json({users});
});
//var game_server = require('./game_server.js');

var sio = io.listen(server);
sio.sockets.on('connection', (socket) =>{
  socket.userid = UUID();
  socket.emit('onconnected', {id:socket.userid});


  //console.log('\t socket.io:: player '+socket.userid+' connected');

  socket.on('message', (msg) => {
        //game_server.onMessage(socket, msg);
  }); 


 

  //Other informaiton of players can be added here!!
  var currentPlayer = {
    id:socket.userid,   //for connection check
    username:socket.username,
    team:'',
  };


  socket.on('add user', (msg) => {
        socket.username = msg;
      
        currentPlayer.id = socket.userid;
        currentPlayer.username = socket.username;
        
        console.log('[INFO] Player ' + msg + ' connecting!');
        socket.emit('NewUsrName',msg);
        //check if there is a repeat connection
        var repeat =1;
        var len = users.length;
        while(len--){
          if(users[len].id === currentPlayer.id || users[len].username === currentPlayer.username){
            repeat=-1;
          }
        }
        if (repeat<0) {
            console.log('[INFO] Player ID is already connected, kicking.');
            socket.disconnect();
        }
        else if ((msg)==""||(msg)==null) {
            socket.emit('kick', 'Invalid username.');
            socket.disconnect();
        } 
        else {
            console.log('[INFO] Player ' + msg+ ' connected!');
            //sockets[socket.userid] = socket;
            users.push(currentPlayer);
            socket.emit('add user',{
              number: users.length
            });
            socket.emit('playerJoin', { name: currentPlayer.name });
            console.log('Total players: ' + users.length);
            if(users.length==8){
                
                users.sort(() => {
                  return .8-Math.random();
                });
                for(var i=0;i<4;i++){
                  users[i].team='A';
                  users[i+4].team='B';
                }
                for(var i=0;i<8;i++){
                  socket.send('r');
                  socket.broadcast.emit('PlayerList', {
                  name:users[i].username
                  });
                  socket.emit('PlayerList', {
                  name:users[i].username
                  });
                }
                var gameId= UUID();
                var playerList = [];
                for(var j=0;j<users.length;j++){
                  TotalUsrs.push(users[j]);
                }
                

                games.push({
                  id: gameId,
                  playerStartIdx: gameCount*8,
                  playerEndIdx: (gameCount+1)*8-1,
                  gamecore:''
                });
                gameCount++;
                users=[];
            }
            //console.log(thegame);
            console.log(TotalUsrs);
            console.log("[INFO] We have "+gameCount+" games.");
            console.log(games);

        }
    });

  
  // socket.on('chat message', function(msg){

  //   console.log(socket.username+":"+msg);

 
  //   socket.emit('chat message', {
  //     username:socket.username,
  //     msg:msg
  //   });
  // });


  //left
  socket.on('disconnect',function(){
    console.log('[INFO] User ' +currentPlayer.id +" disconnected!");
    socket.broadcast.emit('playerDisconnect', { name: currentPlayer.username });
  });       
});


server.listen( port,function() {
    console.log('Listening on ' +':' + port);
});
