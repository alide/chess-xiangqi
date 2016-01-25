import Player from './Player';
import Grid from '../landscapes/Grid';
import Coordinate from './Coordinate';

import moment from 'moment';
import generatePieces from './generatePieces';
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
    this.player2 = new Player({faction: 'black', opponent: this.player1});
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
  selectAvatar(avatar) {
    let {player} = avatar;

    if(this.activePlayer === avatar.player) {
      player.setSelectedAvatar = avatar;
    } 
    else if (avatar.isHaloed()) {
      this.issueKill(this.activePlayer.selectedAvatar, avatar);
    }
    else {
      throw new Error('Cannot kill a unit outside of kill options');
    }
  } 

  issueKill(avatar1, avatar2) {
    avatar1.kill(avatar2);
    this.activePlayer.setSelectedAvatar = null;
    this.endGameCondition();
    this.switchTurn();
  }

  selectMove(coord) {
    if (coord.isHidden()) {
      throw new Error('coord is not highlighted, unable to move'); 
    }
    this.activePlayer.getSelectedAvatar.moveTo(coord);  
    this.switchTurn();
  }

  endGameCondition() {
    if (this.player1.general.isDeceased()) {
      alert('player 2 wins');
    }
    else if (this.player2.general.isDeceased()) {
      alert('player 1 wins');
    }
  }
}