import React, { Component } from 'react';
class LoadingPage extends Component {
	constructor(props) {
    super(props);
    this.state = {
      usrList: [],
      myname:'',
    };
    this.handleUsrCountChange = this.handleUsrCountChange.bind(this);
  }


  handleUsrCountChange(){
  	var socket = io();
    
  	socket.on('NewUsrName', (msg) =>{
  		if(this.state.myname ===''){
        this.setState({
          myname:msg,
        });
        console.log("myname: "+this.state.myname);
      }
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
    var users = this.state.usrList;
    
    
  	if(users.length==8){
      var time = 10; 
    var initialOffset = '440';
    var i = 1;
    var interval = setInterval(function() {
    $('.circle_animation').css('stroke-dashoffset', initialOffset-(i*(initialOffset/time)));
    $('h2').text(10-i);
    if (i == time) {
        clearInterval(interval);
        window.location.href="#/world";
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
      console.log('index: '+index);
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