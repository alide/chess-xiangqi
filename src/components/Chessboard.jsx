import React from 'react';
import d3 from 'd3'; // eslint-disable-line

import toolbox from '../model/toolbox'
import ChessPiece from './ChessPiece'

import ChessGame from '../model/ChessGame'

class Chessboard extends React.Component {

  constructor(props) {
    super(props);
    var game = new ChessGame({
      boardPadding: 50,
    });

    this.state = {
      dimension: 800,
      boardPadding: 50,
      game: game,
      grid: game.grid
    };
  }

  render() {
    window.parent.chess = this;
    var game = this.state.game;

    var translatedBoardPadding = `translate(${this.state.boardPadding}, ${this.state.boardPadding})`

    var grid = [
      <g className="xGrid-group" key="xGrid" stroke="#dd4444" fill="white" strokeWidth="1"
        transform={translatedBoardPadding}
      >
        {
          this.state.grid.verticalLines.map((verticalLineParams)=> {
            return <line {...verticalLineParams}/>
          })
        }
      </g>,

      <g className="yGrid-group" key="yGrid" stroke="#dd4444" fill="white" strokeWidth="1"
        transform={translatedBoardPadding}
      >
        {
          this.state.grid.horizontalLines.map((horizontalLineParams)=> {
            return <line {...horizontalLineParams}/>
          })
        }
      </g>,

      <g className="camp" key="camp" stroke="#dd4444" fill="#eee" strokeWidth="1"
        transform={translatedBoardPadding}>
        {
          this.state.grid.campLines.map(function (lineAttr, index) {
            return <line {...lineAttr} key={`campLine${index}`}/>
          })
        }
      </g>
    ];

    var river = (
      <g className="river" key="river" stroke="#dd4444" fill="#eee" strokeWidth="1"
        transform={translatedBoardPadding}
      >
        <g className="riverContent" {...this.state.grid.riverContent}>
          <rect {...this.state.grid.river}/>
          <g className="kaiti" transform="rotate(270) translate(-40, 75)">
            <text> 楚 </text>
          </g>
          <g className="kaiti" transform="rotate(270) translate(-40, 150)">
            <text> 河 </text>
          </g>
          <g className="kaiti" transform="rotate(90) translate(10, -325)">
            <text> 汉 </text>
          </g>
          <g className="kaiti" transform="rotate(90) translate(10, -250)">
            <text> 界 </text>
          </g>
        </g>
      </g>
    )

    var chesspieces = (
      <g className="chesspieces" key="chesspieces" transform={translatedBoardPadding}>
        {
          game.chesspieces.map(function (chesspiece) {
            return <ChessPiece transform={translatedBoardPadding}
              key={`chesspiece-${chesspiece.name}-横${chesspiece.location.cx}-竖${chesspiece.location.cy}`}
              {...chesspiece}
              location={chesspiece.location}
              player={chesspiece.player}
              chesspiece={chesspiece}
            />
          })
        }
      </g>
    )
    return (
      <svg className="chessboard" height={this.state.dimension} width={this.state.dimension}>
        {grid}
        {this.state.game.grid.river.render()}
        {chesspieces}
      </svg>
    );
  }

  plotLines () {

  }
}


Chessboard.defaultProps = {
};

export default Chessboard;
