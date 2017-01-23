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
var Amilitary ={};
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
                }];
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

                Awood.push({
                  xPos:0,
                  yPos:0,
                  xVel:0,
                  yVel:0,
                  life:0,
                });
                Astone.push({
                  xPos:0,
                  yPos:0,
                  xVel:0,
                  yVel:0,
                  life:0,
                });
                Agold.push({
                  xPos:0,
                  yPos:0,
                  xVel:0,
                  yVel:0,
                  life:0,
                });
                Afarm.push({
                  xPos:0,
                  yPos:0,
                  xVel:0,
                  yVel:0,
                  life:0,
                });
                Ainfantry.push({
                  xPos:0,
                  yPos:0,
                  xVel:0,
                  yVel:0,
                  life:0,
                });
                Acavalry.push({
                  xPos:0,
                  yPos:0,
                  xVel:0,
                  yVel:0,
                  life:0,
                });
                Aarcher.push({
                  xPos:0,
                  yPos:0,
                  xVel:0,
                  yVel:0,
                  life:0,
                });
                Amilitary[0] = {};
                Amilitary[1] = {};
                Bwood.push({
                  xPos:0,
                  yPos:0,
                  xVel:0,
                  yVel:0,
                  life:0,
                });
                Bstone.push({
                  xPos:0,
                  yPos:0,
                  xVel:0,
                  yVel:0,
                  life:0,
                });
                Bgold.push({
                  xPos:0,
                  yPos:0,
                  xVel:0,
                  yVel:0,
                  life:0,
                });
                Bfarm.push({
                  xPos:0,
                  yPos:0,
                  xVel:0,
                  yVel:0,
                  life:0,
                });
                Bmilitary.push({
                  xPos:0,
                  yPos:0,
                  xVel:0,
                  yVel:0,
                  life:0,
                });
                Binfantry.push({
                  xPos:0,
                  yPos:0,
                  xVel:0,
                  yVel:0,
                  life:0,
                });
                Bcavalry.push({
                  xPos:0,
                  yPos:0,
                  xVel:0,
                  yVel:0,
                  life:0,
                });
                Barcher.push({
                  xPos:0,
                  yPos:0,
                  xVel:0,
                  yVel:0,
                  life:0,
                });

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

        }
    });

    //resource update
    socket.on('Aresource', (msg)=>{
          socket.broadcast.emit('AGoldList', JSON.stringify(Agold));
          socket.broadcast.emit('AGoldList',JSON.stringify(Agold));

          socket.broadcast.emit('AWoodList', JSON.stringify(Awood));
          socket.broadcast.emit('AWoodList',JSON.stringify(Awood));

          socket.broadcast.emit('AStoneList', JSON.stringify(Astone));
          socket.broadcast.emit('AStoneList', JSON.stringify(Astone));

          socket.broadcast.emit('AFarmList', JSON.stringify(Afarm));
          socket.broadcast.emit('AFarmList', JSON.stringify(Afarm));

          socket.broadcast.emit('AMilitaryList', JSON.stringify(Amilitary));
          socket.broadcast.emit('AMilitaryList', JSON.stringify(Amilitary));
    });

    socket.on('Bresource', (msg)=>{
          socket.broadcast.emit('BGoldList', JSON.stringify(Bgold));
          socket.broadcast.emit('BGoldList',JSON.stringify(Bgold));

          socket.broadcast.emit('BWoodList', JSON.stringify(Bwood));
          socket.broadcast.emit('BWoodList',JSON.stringify(Bwood));

          socket.broadcast.emit('BStoneList', JSON.stringify(Bstone));
          socket.broadcast.emit('BStoneList', JSON.stringify(Bstone));

          socket.broadcast.emit('BFarmList', JSON.stringify(Bfarm));
          socket.broadcast.emit('BFarmList', JSON.stringify(Bfarm));

          socket.broadcast.emit('BMilitaryList', JSON.stringify(Bmilitary));
          socket.broadcast.emit('BMilitaryList', JSON.stringify(Bmilitary));
    });

    //receive client'dos
    socket.on('Move',(msg)=>{
      //console.log('something is here...');
      //console.log(msg);
        if(msg.team ==='A'){

            if(Afarm.length>=msg.idx+1){
              if(msg.source === 'farm'){
                if(Afarm[msg.idx].xPos !== msg.xPos){
                    Afarm[msg.idx].xPos =msg.xPos;
                }
                if(Afarm[msg.idx].yPos !== msg.yPos){
                    Afarm[msg.idx].yPos = msg.yPos;
                }
                console.log(Afarm[msg.idx]);
              }
            }
        }
        else if( msg.team === 'B'){
            if(Bfarm.length>=msg.idx+1){
              if(msg.source === 'farm'){
                if(Bfarm[msg.idx].xPos !== msg.xPos){
                    Bfarm[msg.idx].xPos =msg.xPos;
                }
                if(Bfarm[msg.idx].yPos !== msg.yPos){
                    Bfarm[msg.idx].yPos = msg.yPos;
                }
                console.log(Bfarm[msg.idx]);
              }
            }
        }

        if(msg.source === 'unit') {
          if(msg.idx === 1 || msg.idx === 0) {
            Amilitary[msg.idx].x = msg.x;
            Amilitary[msg.idx].y = msg.y;
            Amilitary[msg.idx].toX = msg.X;
            Amilitary[msg.idx].toY = msg.Y;
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
