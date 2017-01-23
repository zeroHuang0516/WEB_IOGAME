import React, { Component } from 'react';
class Building extends Component {
    constructor(props) {
    super(props);
    this.state = {
      life: 0,
      xPos: 0,
      yPos: 0,
    };
    this.onBuindingInfoChange = this.onBuildingInfoChange.bind(this);
  }

  onBuildingInfoChange(){
  	  var socket = io();
    socket.emit('Move',{
      team: this.state.myteam,
      name: this.state.myname,
      move: 'default',
    });
  }
}

export default Building;