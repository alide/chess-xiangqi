import config from '../../config/chessConfig'
import matrix from '../models/coordinateMatrix'

var {spacing} = config;

class Avatar {
  constructor ({faction, coordinate, player} = {}) {
    this.faction = faction;

    this.coordinate = coordinate;
    this.coordinate.setAvatar = this;
    
    this.player = player;

    this.moveset = null; // only one moveset for each piece in Chess, i think
    this.deceased = false;
    this.view = null;
  }

  select() {
    // highlight moveset and killermoveset
    
  }

  unselect() {
    matrix.all().map(coord =>  coord.hide());
    this.player.selectedAvatar = null;
  }

  get location() {
    return {
      cx: spacing * this.coordinate.xPoint,
      cy: spacing * this.coordinate.yPoint
    }
  }

  get getMoveOptions() {
    return this.moveset.getMoveOptions;
  }


  set setCoordinate(coord) {
    this.coordinate.setAvatar = null;
    this.coordinate = coord;
    coord.setAvatar = this;
  }

  moveTo(coord) {
    if ( this.getMoveOptions.indexOf(coord) === -1) {
      throw new Error(`coordinate not found, cant move to this location, ${coord}`);
    }
    this.setCoordinate = coord;
    this.unselect();
  }
}

export default Avatar;