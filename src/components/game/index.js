import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './Map';


class Screen extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.state = {
      mapHeight: document.getElementsByClassName('map')[0].clientHeight,
      mapWidth: document.getElementsByClassName('map')[0].clientWidth,
    };
    ReactDOM.render(
      <Map height={this.state.mapHeight} width={this.state.mapWidth} />,
      document.getElementsByClassName('map')[0]
    );
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
            <div className="row map" />
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
