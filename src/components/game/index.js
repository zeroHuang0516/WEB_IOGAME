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
    this.phaserRender = this.phaserRender.bind(this);
  }

  componentDidMount() {
    this.state = {
      mapHeight: document.getElementsByClassName('map')[0].clientHeight,
      mapWidth: document.getElementsByClassName('map')[0].clientWidth,
      phaser: new Phaser.Game(document.getElementsByClassName('map')[0].clientWidth, document.getElementsByClassName('map')[0].clientHeight,
        Phaser.AUTO, 'map', {
          preload: this.preload,
          create: this.create,
          render: this.phaserRender,
          update: this.update,
        }),
    };
  }

  preload() {

  }

  create() {
    const p = this.state.phaser;
    p.nekorz = { press: false };

    p.world.resize(4000, 4000);

    p.selectRect = new Phaser.Rectangle();
    p.add.sprite(0, 0,
      p.create.grid('grid', 4000, 4000, 50, 50, 'rgba(113, 113, 113, 1)')
    );
  }

  update() {
    const p = this.state.phaser;
    // handleSelect
    if (p.input.activePointer.justPressed() && p.nekorz.press === false) {
      p.selectRect.x = p.input.activePointer.x;
      p.selectRect.y = p.input.activePointer.y;
      p.nekorz.press = true;
    }

    if (p.input.activePointer.leftButton.isDown) {
      p.selectRect.width = p.input.activePointer.x - p.selectRect.x;
      p.selectRect.height = p.input.activePointer.y - p.selectRect.y;
    } else {
      p.selectRect.width = 0;
      p.selectRect.height = 0;
      p.nekorz.press = false;
    }

    // scrollWorld
    if (p.input.keyboard.isDown(Phaser.KeyCode.W)) {
      p.camera.y -= 10;
    } else if (p.input.keyboard.isDown(Phaser.KeyCode.S)) {
      p.camera.y += 10;
    }
    if (p.input.keyboard.isDown(Phaser.KeyCode.A)) {
      p.camera.x -= 10;
    } else if (p.input.keyboard.isDown(Phaser.KeyCode.D)) {
      p.camera.x += 10;
    }
  }

  phaserRender() {
    const p = this.state.phaser;
    p.debug.geom(p.selectRect, 'rgba(255, 255, 255, 0.25)');

    p.debug.cameraInfo(p.camera, 32, 32);
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
