import React, { Component } from 'react';
import Building from './Building';
import Game from './game';
class LoadingPage extends Component {
	constructor(props) {
    super(props);
    this.state = {
      doRenderMap:0,
      usrList: [],
      myname:'',
      myteam:'',
      mysocketId:'',
      myGameId:'',
      //team resource
      AwoodList:[],
      AstoneList:[],
      AgoldList:[],
      AfarmList:[],
      AmilitaryList:[],
      AinfantryList:[], //步兵
      AcavalryList:[], //騎兵
      AarcherList:[], //弓兵
      BwoodList:[],
      BstoneList:[],
      BgoldList:[],
      BfarmList:[],
      BmilitaryList:[],
      BinfantryList:[], //步兵
      BcavalryList:[], //騎兵
      BarcherList:[], //弓兵
    };
    this.handleUsrCountChange = this.handleUsrCountChange.bind(this);
    this.renderLoadingPage = this.renderLoadingPage.bind(this);
    this.handleResourceChange = this.handleResourceChange.bind(this);
    this.handlePlayerDo = this.handlePlayerDo.bind(this);
  }


  handleResourceChange(){
        var socket = io();
        var self = this;
        socket.emit('Aresource');
        socket.on('AGoldList', (msg) =>{
            if((this.state.AgoldList) !== msg){
                self.setState({
                    AgoldList: msg,
                });
            }
        });
        socket.on('AWoodList', (msg) =>{
            if((this.state.AwoodList) !== msg){
                self.setState({
                    AwoodList: msg,
                });
            }
        });
        socket.on('AStoneList', (msg) =>{
            if((this.state.AstoneList) !== msg){
                self.setState({
                    AstoneList: msg,
                });
            }
        });

        socket.on('AFarmList', (msg) =>{
            if((this.state.AfarmList) !== msg){
                self.setState({
                    AfarmList: msg,
                });
            }
        });

        socket.on('AMilitaryList', (msg) =>{
            if((this.state.AmilitaryList) !== msg){
                self.setState({
                    AmilitaryList: msg,
                });
            }
        });

        socket.emit('Bresource');
        socket.on('BGoldList', (msg) =>{
            if((this.state.BgoldList) !== msg){
                self.setState({
                    BgoldList: msg,
                });
            }
        });
        socket.on('BWoodList', (msg) =>{
            if((this.state.BwoodList) !== msg){
                self.setState({
                    BwoodList: msg,
                });
            }
        });
        socket.on('BStoneList', (msg) =>{
            if((this.state.BstoneList) !== msg){
                self.setState({
                    BstoneList: msg,
                });
            }
        });

        socket.on('BFarmList', (msg) =>{
            if((this.state.BfarmList) !== msg){
                self.setState({
                    BfarmList: msg,
                });
            }
        });

        socket.on('BMilitaryList', (msg) =>{
            if((this.state.BmilitaryList) !== msg){
                self.setState({
                    BmilitaryList: msg,
                });
            }
        });
        // console.log("gold:"+this.state.AgoldList);
        //  console.log("wood:"+this.state.AwoodList);
        //   console.log("stone:"+this.state.AstoneList);
        //    console.log("farm:"+this.state.AfarmList);
        //     console.log("military:"+this.state.AmilitaryList);
  }

  handlePlayerDo() {
    var socket = io();
    socket.emit('Move',{
      team: this.state.myteam,
      name: this.state.myname,
      source: 'farm',
      idx:0,
      xPos:5,
      yPos:6,
    });

    // this.setState({

    // });

  }

  componentDidUpdate() {
      this.handleResourceChange();
  }


  handleUsrCountChange(){

  	var socket = io();
  	socket.on('NewUsrName', (msg) =>{
  		if(this.state.myname ===''){
        this.setState({
          myname:msg,
        });
        console.log("myname: "+this.state.myname);
        socket.emit('haha',this.state.myname);
        

        
      }
  	});

    socket.on('SocketId', (msg) =>{
        if(this.state.myteam ===''){
            this.setState({
              myteam:msg,
            });
            console.log("socketId: "+this.state.mysocketId);
        }
    });

    socket.on('GameId', (msg) =>{
            this.setState({
              myGameId:msg,
            });
            console.log("gameId: "+this.state.myGameId);
        
    });

      

    socket.on('PlayerList', (msg) =>{
    var list = this.state.usrList;
    var repeat =1;
    var len = list.length;

    if(len<8){
      while(len--){
        if(list[len] === msg.name){
          repeat=-1;
        }
      }
      if (repeat>0) {
        list.push(msg.name);
        this.setState({
          usrList: list,
        });
        console.log(this.state.usrList);
      }

      //team
      if(this.state.usrList.length==8){
      var index=0;
        var len = 8;
        while(len--){
          if(this.state.usrList[len] === this.state.myname){
            index = len;
            break;
          }
        }
      
            if(index%8 <=3){
              this.setState({
                  myteam:'A',
              });
            }
            else{
              this.setState({
                  myteam:'B',
              });
            }
            console.log('team: '+this.state.myteam);
      }
        
    }
    });


  }

  createList(text) {
    return(
        <li><a href="">{text}</a></li>
      );
  }

  createmyList(text) {
    return(
        <li><a style={{backgroundColor:'#FF2D2D', background:'#ADADAD'}}>{text}</a></li>
      );
  }

  renderATeam(idx){
    var users = this.state.usrList;
    if(idx==0){
      return(
      <div id="startMenuWrapper">
          <div id="startMenuN">
            <p>Team A</p>
              <div className="teamA">
                <ol className="rectangle-list">
                <ol id="list">
                  {this.createmyList(users[0])}
                  {this.createList(users[1])}
                  {this.createList(users[2])}
                  {this.createList(users[3])}
                </ol>     
                </ol>
              </div>
          </div>
      </div>
      );
    }
    else if(idx==1){
      return(
      <div id="startMenuWrapper">
          <div id="startMenuN">
            <p>Team A</p>
              <div className="teamA">
                <ol className="rectangle-list">
                <ol id="list">
                  {this.createList(users[0])}
                  {this.createmyList(users[1])}
                  {this.createList(users[2])}
                  {this.createList(users[3])}
                </ol>     
                </ol>
              </div>
          </div>
      </div>
      );
    }
    else if(idx==2){
      return(
      <div id="startMenuWrapper">
          <div id="startMenuN">
            <p>Team A</p>
              <div className="teamA">
                <ol className="rectangle-list">
                <ol id="list">
                  {this.createList(users[0])}
                  {this.createList(users[1])}
                  {this.createmyList(users[2])}
                  {this.createList(users[3])}
                </ol>     
                </ol>
              </div>
          </div>
      </div>
      );
    }
    else if(idx==3){
      return(
      <div id="startMenuWrapper">
          <div id="startMenuN">
            <p>Team A</p>
              <div className="teamA">
                <ol className="rectangle-list">
                <ol id="list">
                  {this.createList(users[0])}
                  {this.createList(users[1])}
                  {this.createList(users[2])}
                  {this.createmyList(users[3])}
                </ol>     
                </ol>
              </div>
          </div>
      </div>
      );
    }
    else{
      return(
      <div id="startMenuWrapper">
          <div id="startMenuN">
            <p>Team A</p>
              <div className="teamA">
                <ol className="rectangle-list">
                <ol id="list">
                  {this.createList(users[0])}
                  {this.createList(users[1])}
                  {this.createList(users[2])}
                  {this.createList(users[3])}
                </ol>     
                </ol>
              </div>
          </div>
      </div>
      );
    }
  }

  renderBTeam(idx){
    var users = this.state.usrList;
    if(idx==4){
      return(
        <div id="startMenuWrapper">
          <div id="startMenu_2">
            <p>Team B</p>
              <div className="teamA">
              <ol className="rectangle-listB">
                <ol id="af">
                  {this.createmyList(users[4])}
                  {this.createList(users[5])}
                  {this.createList(users[6])}
                  {this.createList(users[7])}
                </ol>        
              </ol>
              </div>
          </div>
        </div>
      );
    }
    else if(idx==5){
      return(
        <div id="startMenuWrapper">
          <div id="startMenu_2">
            <p>Team B</p>
              <div className="teamA">
              <ol className="rectangle-listB">
                <ol id="af">
                  {this.createList(users[4])}
                  {this.createmyList(users[5])}
                  {this.createList(users[6])}
                  {this.createList(users[7])}
                </ol>        
              </ol>
              </div>
          </div>
        </div>
      );
    }
    else if(idx==6){
      return(
        <div id="startMenuWrapper">
          <div id="startMenu_2">
            <p>Team B</p>
              <div className="teamA">
              <ol className="rectangle-listB">
                <ol id="af">
                  {this.createList(users[4])}
                  {this.createList(users[5])}
                  {this.createmyList(users[6])}
                  {this.createList(users[7])}
                </ol>        
              </ol>
              </div>
          </div>
        </div>
      );
    }
    else if(idx==7){
      return(
        <div id="startMenuWrapper">
          <div id="startMenu_2">
            <p>Team B</p>
              <div className="teamA">
              <ol className="rectangle-listB">
                <ol id="af">
                  {this.createList(users[4])}
                  {this.createList(users[5])}
                  {this.createList(users[6])}
                  {this.createmyList(users[7])}
                </ol>        
              </ol>
              </div>
          </div>
        </div>
      );
    }
    else {
      return(
        <div id="startMenuWrapper">
          <div id="startMenu_2">
            <p>Team B</p>
              <div className="teamA">
              <ol className="rectangle-listB">
                <ol id="af">
                  {this.createList(users[4])}
                  {this.createList(users[5])}
                  {this.createList(users[6])}
                  {this.createList(users[7])}
                </ol>        
              </ol>
              </div>
          </div>
        </div>
      );
    }
   
  }
 


  renderLoadingPage(){
    this.handleUsrCountChange();
    this.handlePlayerDo();
    var users = this.state.usrList;
    var doRenderMap = 0;
    
  	if(users.length==8){
    var time = 10; 
    var initialOffset = '440';
    var i = 1;
    var that = this;
    var interval = setInterval(function() {
    $('.circle_animation').css('stroke-dashoffset', initialOffset-(i*(initialOffset/time)));
    $('h2').text(10-i);
    if (i == time) {
        doRenderMap = 1;
        clearInterval(interval);
        that.setState({
          doRenderMap:1,
        });
        //window.location.href="#/world";
    }
    i++;  
}, 1000);
      var index=0;
      var len = 8;
      while(len--){
        if(this.state.usrList[len] === this.state.myname){
          index = len;
          break;
        }
      }
      
      
      
      if(this.state.doRenderMap == 0){
            return(
                <div>
                  {this.renderATeam(index)}
                  <h3 style={{color:'white',position:'absolute',left:'49%', top:'20%'}}>After</h3>
                  <div className="item html">
                    <h2>10</h2>
                    <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
                    <circle id="circle" className="circle_animation" r="69.85699" cy="81" cx="81" strokeWidth="8" stroke="#6fdb6f" fill="none"/>
                    </svg>
                  </div>
                  <h3 style={{color:'white',position:'absolute',left:'43.5%',top:'55%'}}>Will Enter the Game</h3>
                  {this.renderBTeam(index)}
                </div>
            );
      }
      else if(this.state.doRenderMap == 1){
                return <Game />;
      }
  		
    }
    else{
      return (
        <div>   
      <div className="container">
        <div className="row mt">
            <div className="col-md-12">
                <div style={{backgroundColor:'#222', position:'absolute', top:'50%', left:'50%'}}>
                    <div className="loader2"></div>
                  </div>
                </div>
                <div style={{textAlign:'center', position:'relative', top:'350px'}}>
                <h3 style={{color:'white', fontSize:'20px'}}>Waiting for other players to connect . . .</h3>
              </div>
              </div>
            </div>
          
        </div>
      );
  	}
  }



	render() {
		return(
			<div>
			{this.renderLoadingPage()}
			</div>
		);
	}
	  
  		
}
export default LoadingPage;