import React, { Component } from 'react';
class HomePage extends Component {
    constructor(props) {
    super(props);
    this.state = {
      usrList: [],
      usercount: 0,
      usrInput:'',
    };
    this.onUsrInputChange = this.onUsrInputChange.bind(this);
  }

  onUsrInputChange = (e) => {
    this.setState({
      usrInput:e.target.value,
    })
  }

  
  handleSubmitEnter = (e) =>{
    var socket = io();
    if(e.which == 13){
      var name = this.state.usrInput;
      if(name == "" || name == null){
        alert("You should input a playerName!!!");
        this.setState({
          usrInput:'',
        });
      }
      else{
        console.log("OkKK!");
          socket.emit('add user',name);
          socket.on('checkNumOfPlayers',(data)=>{
                // this.setState({
                //   usercount : data.number,
                // })
                console.log("asfasf:: "+this.state.usercount);
          });
          this.setState({
              usrInput:'',
          });
          window.location.href="#/loading";
      }
    }
  }

  handleSubmitClick = (e) =>{
      var socket = io();
      var name = this.state.usrInput;
      if(name == "" || name == null){
        alert("You should input a playerName!!!");
        this.setState({
          usrInput:'',
        });
      }
      else{
        console.log("Ok!");
          socket.emit('add user',name);
          socket.on('checkNumOfPlayers',(data)=>{
                // this.setState({
                //   usercount : data.number,
                // })
                console.log("asfasf:: "+this.state.usercount);
          });
          this.setState({
              usrInput:'',
          });
          window.location.href="#/loading";
      }
  }

    handleUsrCountChange(){
    var socket = io();
    socket.on('checkNumOfPlayers', (msg) =>{
      window.location.href="#/articles/new";
    });
  }

  
            
  render() {
    this.handleUsrCountChange();
    return (
    <div>
        <div id="gameAreaWrapper">
          <canvas tabIndex="1" id="cvs"></canvas>
        </div>
        <div id="startMenuWrapper">
          <div id="startMenu">
            <p>IO Game</p>
            <input type="text" tabIndex="0" autoFocus placeholder="Enter your name here" id="playerNameInput" maxLength="25" onChange={this.onUsrInputChange} onKeyPress={this.handleSubmitEnter} />
            <b className="input-error">Nick must be alphanumeric characters only!</b>
            <br />
            <a><button id="startButton" onClick={this.handleSubmitClick}>Play</button></a>
            <br />
            <div id="instructions">
                <h3>Gameplay</h3>
                <ul>
                    <li>Move your mouse on the screen to move your character.</li>
                    <li>Eat food and other players in order to grow your character (food respawns every time a player eats it).</li>
                    <li>A player's mass is the number of food particles eaten.</li>
                    <li>Objective: Try to get fat and eat other players.</li>
                </ul>
            </div>
        </div>
    </div>
    </div>
    );
  }
}

export default HomePage;