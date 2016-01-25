import Moveset from './Moveset';
import matrix from 'components/models/coordinateMatrix';
import tools from 'components/toolbox/tools';
import General from '../avatars/General'


export default class Proxmity extends Moveset {
  constructor(avatar) {
    super(avatar)
  }

  get getPotentialOptions() {
    

    let restriction = this.avatar.belongsToTopFaction ? 
      {x: [3,4,5], y: [0,1,2]} :
      {x: [3,4,5], y: [7,8,9]}

    return [
      matrix.coord(this.x, this.y+1),
      matrix.coord(this.x, this.y-1),
      matrix.coord(this.x+1, this.y),
      matrix.coord(this.x-1, this.y),
    ].filter(coord => {
      return !!coord && restriction.x.indexOf(coord.xPoint) !== -1 && restriction.y.indexOf(coord.yPoint) !== -1;
    });
  }

  get getMoveOptions() {
    this.x = this.avatar.coordinate.xPoint;
    this.y = this.avatar.coordinate.yPoint;

    return this.getPotentialOptions.filter((coord)=> {
      return !coord.avatar;
    });
  }

  get getKillOptions() {
    this.x = this.avatar.coordinate.xPoint;
    this.y = this.avatar.coordinate.yPoint;

    return this.getPotentialOptions.filter((coord)=> {
      return coord.avatar && coord.avatar.player !== this.avatar.player
    }).concat(this.getFlyingGeneralOption)
  }

  get getFlyingGeneralOption() {
    let col = matrix.col(this.x);
    let dissection = tools.dissect(col, this.currentY, this.currentY + 1);
    let top = dissection[0].reverse();
    let bottom = dissection[2];

    if (this.avatar.belongsToTopFaction) {
      return bottom.filter((coord)=> {
        return coord.avatar;
      }).slice(0, 1).filter(function (coord) {
        return coord.avatar instanceof General;
      });
    }
    else {
      return top.filter((coord)=> {
        return coord.avatar;
      }).slice(0, 1).filter(function (coord) {
        return coord.avatar instanceof General;
      });
    }
  }
}