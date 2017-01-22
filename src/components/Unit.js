import React, { Component } from 'react';
class Unit extends Component {
    constructor(props) {
    super(props);
    this.state = {
      life: 0,
      xPos: 0,
      yPos: 0,
    };
    this.onBuindingInfoChange = this.onUnitInfoChange.bind(this);
  }

  onUnitInfoChange(){
  	  var socket = io();
      sockeu.on('update',(msg)=>{

      });
      socket.emit('move',(msg)=>{

      });
      socket.emit('change',(msg)=>{

      });
  }
}

export default Unit;