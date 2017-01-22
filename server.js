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




var users = [
    {
        id:'default',   //for connection check
        username:'1',
        team:'dafault',
    },
    {
        id:'',   //for connection check
        username:'2',
        team:'',
    },
    {
        id:'',   //for connection check
        username:'3',
        team:'',
    },
    {
        id:'',   //for connection check
        username:'4',
        team:'',
    },
    {
        id:'',   //for connection check
        username:'5',
        team:'',
    },
    {
        id:'',   //for connection check
        username:'6',
        team:'',
    },
];


var TotalUsrs = [];
var games = [];
var gameCount = 0;

var Awood =[];
var Astone =[];
var Agold =[];
var Afarm =[];
var Amilitary =[];
var Ainfantry =[];
var Acavalry =[];
var Aarcher =[];

var Bwood =[];
var Bstone =[];
var Bgold =[];
var Bfarm =[];
var Bmilitary =[];
var Binfantry =[];
var Bcavalry =[];
var Barcher =[];


var Ateams = [{
                  id: 0,
                  AplayersStrIdx: 0,
                  AplayersEndIdx: 0,
                  wood:0,
                  stone:0,
                  gold:0,
                  farm:0,
                  military:0,
                  infantry:0, //步兵
                  cavalry:0, //騎兵
                  archer:0, //弓兵
                },];
var Bteams = [];







router.get('/',(req,res)=>{
  res.json({users});
});
//var game_server = require('./game_server.js');

var sio = io.listen(server);
sio.sockets.on('connection', (socket) =>{
  socket.userid = socket.id;
  socket.emit('onconnected', {id:socket.userid});


  //console.log('\t socket.io:: player '+socket.userid+' connected');

  


 

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
        socket.emit('SocketId', socket.userid);
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
                var gameId= socket.id;
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

                Ateams.push({
                  id: gameId,
                  AplayersStrIdx: gameCount*8,
                  AplayersEndIdx: gameCount*8+3,
                  wood:0,
                  stone:0,
                  gold:0,
                  farm:0,
                  military:0,
                  infantry:0, //步兵
                  cavalry:0, //騎兵
                  archer:0, //弓兵
                });
                Bteams.push({
                  id: gameId,
                  BplayersStrIdx: gameCount*8+4,
                  BplayersEndIdx: (gameCount+1)*8-1,
                  wood:0,
                  stone:0,
                  gold:0,
                  farm:0,
                  military:0,
                  infantry:0, //步兵
                  cavalry:0, //騎兵
                  archer:0, //弓兵
                });

                Awood.push(0); 
                Astone.push(0); 
                Agold.push(0); 
                Afarm.push(0); 
                Amilitary.push(0); 
                Ainfantry.push(0); 
                Acavalry.push(0); 
                Aarcher.push(0); 

                Bwood.push(0); 
                Bstone.push(0); 
                Bgold.push(0); 
                Bfarm.push(0); 
                Bmilitary.push(0); 
                Binfantry.push(0); 
                Bcavalry.push(0); 
                Barcher.push(0); 

                socket.broadcast.emit('GameId', gameCount);
                socket.emit('GameId', gameCount);

                gameCount++;
                users=[];
            }
            //console.log(thegame);
            console.log(TotalUsrs);
            console.log("[INFO] We have "+gameCount+" games.");
            console.log(games);

            console.log("[INFO] We have "+Ateams.length+" Ateams.");
            console.log(Ateams);

            console.log("[INFO] We have "+Bteams.length+" Bteams.");
            console.log(Bteams);
            if(Ateams.length>=1){
              console.log(Agold[0]);
            }
            

        }
    });




  //left
  socket.on('disconnect',function(){
    console.log('[INFO] User ' +currentPlayer.id +" disconnected!");
    socket.broadcast.emit('playerDisconnect', { name: currentPlayer.username });
  });       
});


server.listen( port,function() {
    console.log('Listening on ' +':' + port);
});
