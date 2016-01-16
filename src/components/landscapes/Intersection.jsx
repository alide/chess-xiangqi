import React from 'react';
import Coordinate from '../models/Coordinate';

require('styles/Intersection.css.scss');

export default class Intersection extends React.Component{
  constructor({coord}) {
    super();
    this.coord = coord;
    this.coord.view = this;
  }

  render() {
    let className = `intersection intersection-${this.coord.location.cx}-${this.coord.location.cy} ${this.coord.avatar && 'occupied'}`;
    className += ` ${(this.coord.state === Coordinate.HIGHLIGHT) && (`highlight highlight-${this.coord.highlightFaction}`)}`;
    
    return (
      <g className={className} key={className} onClick={this.props.moveToIntersection}>
        <circle r="14"
          cy={this.coord.location.cy}
          cx={this.coord.location.cx}
          stroke={1}
        />
      </g>
    );
  }

}