import React, { Component } from 'react';
import 'pixi';
import 'p2';
import Phaser from 'phaser';
// import Map from './Map';
import Client from './Client';

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
      client: new Client(),
    };
  }

  preload() {
    const p = this.state.phaser;

    p.load.image('circle', '../../../assets/circle.png', 32, 32);
  }

  create() {
    const p = this.state.phaser;
    p.nekorz = { press: false };
    p.nekorz.rightPressed = false;
    p.nekorz.selectedUnits = p.add.group();

    p.physics.startSystem(Phaser.Physics.ARCADE);
    p.world.resize(4000, 4000);
    p.canvas.oncontextmenu = e => { e.preventDefault(); };

    p.selectRect = new Phaser.Rectangle();
    p.selectRectBody = p.add.sprite(0, 0, null);
    p.physics.enable(p.selectRectBody, Phaser.Physics.ARCADE);

    p.add.sprite(0, 0,
      p.create.grid('grid', 4000, 4000, 50, 50, 'rgba(113, 113, 113, 1)')
    );

    this.state.client.unitList = p.add.physicsGroup(Phaser.Physics.ARCADE);
    let c = p.add.sprite(100, 100, 'circle');
    c.setScaleMinMax(0.25);
    p.physics.enable(c, Phaser.Physics.ARCADE);
    c.body.setSize(16, 16);

    this.state.client.unitList.add(c);

    c = p.add.sprite(130, 130, 'circle');
    c.setScaleMinMax(0.25);
    p.physics.enable(c, Phaser.Physics.ARCADE);
    c.body.setSize(16, 16);

    this.state.client.unitList.add(c);
  }

  update() {
    const p = this.state.phaser;
    const worldPointer = {
      x: p.input.activePointer.x + p.camera.x,
      y: p.input.activePointer.y + p.camera.y,
    };
    // handleSelect
    if (p.input.activePointer.leftButton.isDown && p.nekorz.press === false) {
      p.selectRect.x = worldPointer.x;
      p.selectRect.y = worldPointer.y;
      p.nekorz.press = true;
      p.nekorz.selectedUnits.forEach(s => {
        this.state.client.unitList.add(s);
      });
    } else if (p.input.activePointer.leftButton.isDown) {
      p.selectRect.width = worldPointer.x - p.selectRect.x;
      p.selectRect.height = worldPointer.y - p.selectRect.y;
    } else if (p.nekorz.press === true) {
      let w = p.selectRect.width;
      let h = p.selectRect.height;
      let l = p.selectRect.left;
      let t = p.selectRect.top;
      if (w < 0) {
        l += w;
        w *= -1;
      }
      if (h < 0) {
        t += h;
        h *= -1;
      }
      p.selectRectBody.body.setSize(w, h, 0, 0);
      p.selectRectBody.x = l;
      p.selectRectBody.y = t;

      console.log('wut');
      while (p.physics.arcade.overlap(
        p.selectRectBody,
        this.state.client.unitList,
        (r, s) => {
          p.nekorz.selectedUnits.add(s);
          console.log('selected!');
        }));
      p.selectRect.width = 0;
      p.selectRect.height = 0;
      p.nekorz.press = false;
    }

    if (p.input.activePointer.rightButton.isDown && p.nekorz.rightPressed === false) {
      p.nekorz.rightPressed = true;
      p.nekorz.selectedUnits.forEach(s => {
        const dist = p.physics.arcade.distanceToXY(s, worldPointer.x, worldPointer.y);
        s.body.moveTo(dist * 5, dist,
          p.physics.arcade.angleToPointer(s) * (180.0 / 3.141592653)
        );
      });
    } else if (!p.input.activePointer.rightButton.isDown) {
      p.nekorz.rightPressed = false;
    }

    if (p.input.keyboard.isDown(Phaser.KeyCode.ESC)) {
      p.nekorz.selectedUnits.forEach(s => {
        this.state.client.unitList.add(s);
      });
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
    p.debug.geom(p.nekorz.c, 'rgba(255, 255, 255, 1)');
    // p.debug.cameraInfo(p.camera, 32, 32);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row screen">
          <span className="col-md-2 left">
            <div className="row building">
              <span>BUILDING</span>
              <button className="buildingBtn" >Farm</button>
              <button className="buildingBtn" >Military</button>
              <button className="buildingBtn" >infantry</button>
              <button className="buildingBtn" >cavalry</button>
              <button className="buildingBtn" >archer</button>
            </div>
            
            <div className="row resource">
              <span>RESOURCE</span>
              <button className="myButton" > Gold: x20</button>
              <button className="myButton" > Wood:  x5</button>
            </div>
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