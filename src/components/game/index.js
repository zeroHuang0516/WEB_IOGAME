import React, { Component } from 'react';
import 'pixi';
import 'p2';
import Phaser from 'phaser';
// import Map from './Map';


class Screen extends Component {
  constructor() {
    super();
    this.state = {};

    this.preload = this.preload.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.state = {
      mapHeight: document.getElementsByClassName('map')[0].clientHeight,
      mapWidth: document.getElementsByClassName('map')[0].clientWidth,
      phaser: new Phaser.Game(document.getElementsByClassName('map')[0].clientWidth, document.getElementsByClassName('map')[0].clientHeight,
        Phaser.AUTO, 'map', {
          preload: this.preload,
          create: this.create,
          update: this.update
        }),
    };
  }

  preload() {

  }

  create() {
    const style = {
      font: 'bold 11px Arial',
      fill: '#ffffff',
    };
    this.state.phaser.add.text(10, 10, 'Is this working?', style);
  }

  update() {

  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row screen">
          <span className="col-md-2 left">
            <div className="row building">building</div>
            <div className="row resource">resource</div>
          </span>
          <span className="col-md-10 right">
            <div className="row map" id="map" />
            <div className="row info">
              <span className="col-md-10 detail">detail</span>
              <span className="col-md-2 minimap">minimap</span>
            </div>
          </span>
        </div>
      </div>
    );
  }
}

export default Screen;
