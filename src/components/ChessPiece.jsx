import React from 'react';
require('styles/App.css.scss');
require('styles/ChessPiece.css.scss');

class ChessPiece extends React.Component {
  render() {
    return (
      <g className={`chess-piece ${this.props.faction}`}>
        <circle className="piece-block" cy={this.props.location.cy} cx={this.props.location.cx} r="20" stroke="#DAC298" strokeWidth="1" fillOpacity="1"/>
        <circle className="piece-outline" cy={this.props.location.cy} cx={this.props.location.cx} r="15" strokeWidth="2" fillOpacity="0"/>
        <circle className="piece-outline" cy={this.props.location.cy} cx={this.props.location.cx} r="20" strokeWidth="1" fillOpacity="0"/>
        <text x={this.props.location.cx-10} y={this.props.location.cy+7}>{this.props.name}</text>
      </g>
    )
  }
}

export default ChessPiece