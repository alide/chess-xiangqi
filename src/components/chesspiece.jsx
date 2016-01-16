import React from 'react';

require('styles/ChessPiece.css.scss');

class ChessPiece extends React.Component {

  constructor(props) {
    super();

    props.avatar.view = this;
  }

  render() {
    var selected = this.props.player.selectedAvatar === this.props.avatar;

    return (
      <g className={`chess-piece ${this.props.faction} ${selected ? 'selected' : ''}`}
        onClick={this.props.selectChessPiece}
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

        <text x={this.props.location.cx-10} y={this.props.location.cy+7} >{this.props.name}</text>
      </g>
    );
  }
}

export default ChessPiece