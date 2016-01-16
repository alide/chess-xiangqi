import React from 'react';

import ChessPiece from './chesspiece'

import ChessGame from './models/ChessGame'
import River from './landscapes/River'
import Intersection from './landscapes/Intersection'

import config from '../config/chessConfig'
var {dimension, boardPadding} = config; 


class Chessboard extends React.Component {

  constructor() {
    super();
    this.chessgame = window.chessgame = new ChessGame;
    window.chessboard = this;
    this.state = {
      boardPadding: 50,
      game: this.chessgame
    };

    this.translatedBoardPadding = `translate(${boardPadding}, ${boardPadding})`
  }

  render() {
    return (
      <svg className="chessboard" height={dimension} width={dimension} tabIndex='10' onBlur={this.onBlur.bind(this)}>
        {this.chessgame.grid.render()}
        <River />
        {this.renderChesspieces()}
        {this.renderIntersections()}
      </svg>
    );
  }

  renderChesspieces() {
    
    return (
      <g className="chesspieces" key="chesspieces" transform={this.translatedBoardPadding}>
        {this.chessgame.getAvatars.map((avatar)=> {
          return <ChessPiece transform={this.translatedBoardPadding}
            key={`avatar-${avatar.name}-横${avatar.location.cx}-竖${avatar.location.cy}`}
            {...avatar}
            location={avatar.location}
            player={avatar.player}
            avatar={avatar}
            selectChessPiece = {this.selectChessPiece.bind(this, avatar)}
          />
        })}
      </g>
    )
  }

  renderIntersections() {
    return (
      <g className="intersections" key="intersections" transform={this.translatedBoardPadding} >
        {this.chessgame.coordinates.map((xSetVertical)=> {
          return xSetVertical.map((coord)=> {
            return <Intersection coord={coord} moveToIntersection={this.moveToIntersection.bind(this, coord)}/>
          })
        })}
      </g>
    );
  }

  selectChessPiece (avatar) {
    this.chessgame.selectAvatar(avatar.player, avatar);
    this.forceUpdate();
  }

  moveToIntersection (coord) {
    this.chessgame.selectMove(coord);
    this.forceUpdate();
  }

  onBlur() {
    this.chessgame.activePlayer.setSelectedAvatar = null;
    this.forceUpdate();
  }
}

Chessboard.defaultProps = {};

export default Chessboard;
