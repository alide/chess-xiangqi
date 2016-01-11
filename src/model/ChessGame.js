import Player from './Player'
import Grid from './Grid';

import moment from 'moment';
import generatePieces from './generatePieces';

class Stat {
  constructor() {
    this.clock = moment();
  }
}


export default class ChessGame{

  constructor ({boardPadding} = {}) {
    this.stat = new Stat();
    this.boardPadding = boardPadding;
    this.grid = new Grid({
      x:       9,
      y:       10,
      spacing: 50,
      boardPadding
    });

    this.points = this.grid.points;

    this.player1 = new Player({faction: 'red'});
    this.player2 = new Player({faction: 'black'});
    this.activePlayer = this.player1;

    this.player1.chesspieces = generatePieces.call(this, this.player1);
    this.player2.chesspieces = generatePieces.call(this, this.player2);
  }

  get switchTurn() {
    if (this.activePlayer === this.player1) {
      this.activePlayer = this.player2;
    }
    else {
      this.activePlayer = this.player1;
    }
    return this.activePlayer;
  }

  get chesspieces() {
    return this.player1.chesspieces.concat(this.player2.chesspieces);
  }

}