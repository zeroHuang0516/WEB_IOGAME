import React, { Component } from 'react';

class Screen extends Component {
  render() {
    return (
      <div className="screen">screen
        <span className="left">left
          <div className="building">building</div>
          <div className="resource">resource</div>
        </span>
        <span className="right">right
          <div className="map">map</div>
          <div className="info">info
            <span className="detail">detail</span>
            <span className="minimap">minimap </span>
          </div>
        </span>
      </div>
    );
  }
}

export default Screen;
