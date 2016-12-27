import React, { Component, PropTypes } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import Konva from 'konva';

class Map extends Component {
  constructor() {
    super();
    this.state = {
      color: 'red',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillUpdate() {
    console.log(this.props.height);
  }

  handleClick() {
    this.setState({
      color: Konva.Util.getRandomColor(),
    });
  }

  render() {
    return (
      <Stage
        width={this.props.width} height={this.props.height}
      >
        <Layer>
          <Rect
            x={10} y={10} width={50} height={50}
            fill={this.state.color}
            onClick={this.handleClick}
          />
        </Layer>
      </Stage>
    );
  }
}

Map.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Map;
