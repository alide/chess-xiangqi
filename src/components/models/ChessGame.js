import Player from './Player';
import Grid from '../landscapes/Grid';
import Coordinate from './Coordinate';

import moment from 'moment';
import generatePieces from '../toolbox/generatePieces';
import coordinateMatrix from './coordinateMatrix';

window.Coordinate = Coordinate;

class Stat {
  constructor() {
    this.clock = moment();
  }
}

export default class ChessGame{

  constructor () {
    this.stat = new Stat;
    this.grid = new Grid;

    this.player1 = new Player({faction: 'red'});
    this.player2 = new Player({faction: 'black'});
    this.activePlayer = this.player1;

    this.coordinates = coordinateMatrix;

    this.player1.avatars = generatePieces.call(this, this.player1);
    this.player2.avatars = generatePieces.call(this, this.player2);
  }

  switchTurn() {
    if (this.activePlayer === this.player1) {
      this.activePlayer = this.player2;
    } else {
      this.activePlayer = this.player1;
    }
    return this.activePlayer;
  }

  get getAvatars() {
    return this.player1.avatars.concat(this.player2.avatars);
  }

  // Game Progression methods
  selectAvatar(player, avatar) {
    if (!player && !avatar) {
      throw new Error(`#selectChessavatar expect both player and avatar to exist, ${player}, ${avatar}`);
    }
    else if (avatar.player !== player) {
      throw new Error('avatar does not belong to player');
    }
    else if (this.activePlayer !== player) {
      throw new Error(`not your turn yet, ${player.faction}`)
    }
    player.setSelectedAvatar = avatar;
  } 

  selectMove(coord) {
    if (!coord.isHighlighted()) {
      throw new Error('coord not highlighted'); 
    }
    this.activePlayer.getSelectedAvatar.moveTo(coord);  
    this.switchTurn();
  }
}