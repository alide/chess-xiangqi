import Moveset from './Moveset'
import matrix from 'components/models/coordinateMatrix';

export default class March extends Moveset {

  constructor(avatar) {
    super(avatar) 
  }

  get getMoveOptions() {
    this.x = this.avatar.coordinate.xPoint;
    this.y = this.avatar.coordinate.yPoint;

    let sideOptions = [
      matrix.coord(this.x+1, this.y),
      matrix.coord(this.x-1, this.y)
    ];

    let marchOption = matrix.coord(this.x, this.avatar.isTopFaction ? this.y+1 : this.y-1);

    if (this.avatar.hasCrossedRiver) {
      return [...sideOptions, marchOption].filter((coord) => {
        return !!coord;
      });
    }

    return [marchOption];
  }

  get getKillOptions() {
    return this.getMoveOptions.filter((coord)=> {
      return !!coord && coord.avatar && coord.avatar.player !== this.avatar.player;
    });
  }
}