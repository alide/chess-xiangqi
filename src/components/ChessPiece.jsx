import React from 'react';

require('styles/App.css.scss');
require('styles/ChessPiece.css.scss');

class ChessPiece extends React.Component {

  constructor() {
    super();
    // this.state = set up state here
  }

  render() {
    var selected = this.props.player.selectedPiece === this.props.chesspiece;

    return (
      <g className={`chess-piece ${this.props.faction} ${selected ? 'selected' : ''}`}
        onClick={this.selectPiece.bind(this)}
      >

        <circle className="piece-outline" 
          cy={this.props.location.cy} 
          cx={this.props.location.cx} 
          r="20" 
        />

        <circle className="piece-inline" 
          cy={this.props.location.cy} 
          cx={this.props.location.cx} 
          r="15" 
        />

        <circle className="piece-block" 
          cy={this.props.location.cy} 
          cx={this.props.location.cx} 
          r="15" 
        />

        <text x={this.props.location.cx-10} y={this.props.location.cy+7}>{this.props.name}</text>
      </g>
    )
  }

  selectPiece(e) {
    this.props.player.selectPiece = this.props.chesspiece;
    this.forceUpdate()
  }
}

export default ChessPiece