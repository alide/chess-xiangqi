import React from 'react';

import ChessPiece from './Chesspiece'
import River from './River'
import Intersection from './Intersection'

import ChessGame from '../models/ChessGame'
import config from '../../config/chessConfig'

var {dimension, boardPadding} = config; 


class Chessboard extends React.Component {

  constructor() {
    super();
    this.chessgame = window.chessgame = new ChessGame;
    window.chessboard = this;
    this.state = {
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
        {this.chessgame.getAvatars.map((avatar, index)=> {
          return <ChessPiece transform={this.translatedBoardPadding}
            key={`avatar-${index}-${avatar.name}-横${avatar.location.cx}-竖${avatar.location.cy}`}
            {...avatar}
            avatar={avatar}
            selectChesspiece = {this.selectChesspiece.bind(this, avatar)}
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
            return <Intersection coord={coord} 
              selectIntersection={this.selectIntersection.bind(this, coord)}
            />;
          })
        })}
      </g>
    );
  }

  selectChesspiece (avatar) {
    this.chessgame.selectAvatar(avatar);
    this.forceUpdate();
  }

  selectIntersection (coord) {
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
