import React, { Component } from 'react';

class Screen extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row screen">
          <span className="col-md-2 left">
            <div className="row building">building</div>
            <div className="row resource">resource</div>
          </span>
          <span className="col-md-10 right">
            <div className="row map">map</div>
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
