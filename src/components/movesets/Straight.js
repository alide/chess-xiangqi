import Moveset from './Moveset';
import matrix from '../models/coordinateMatrix';
import tools from '../toolbox/tools';

export default class Straight extends Moveset {
  constructor (avatar) {
    super(avatar)
  }

  get getMoveOptions() {

    let currentX = this.currentX = this.avatar.coordinate.xPoint;
    let currentY = this.currentY = this.avatar.coordinate.yPoint;

    let colOptions = matrix.col(currentX);
    let rowOptions = matrix.row(currentY);

    // fitler out blockades and return result
    rowOptions = this.eliminationByHorizontalAdjacence(rowOptions, currentX)
    colOptions = this.eliminationByVerticalAdjacence(colOptions, currentY)

    return colOptions.concat(rowOptions);
  }

  eliminationByVerticalAdjacence(colOptions, currentY) {
    let dissection = tools.dissect(colOptions, currentY, currentY + 1);
    let top = dissection[0].reverse();
    let bottom = dissection[2];

    top = this.untilEncounterAvatar(top)
    bottom = this.untilEncounterAvatar(bottom)

    return [...top, ...bottom];
  }

  eliminationByHorizontalAdjacence(rowOptions, currentX) {
    let dissection = tools.dissect(rowOptions, currentX, currentX + 1);
    let left = dissection[0].reverse();
    let right = dissection[2];

    left = this.untilEncounterAvatar(left)
    right = this.untilEncounterAvatar(right)

    return [...left, ...right];
  }

  /**
   * Return all coordinate until encounter a coordinate with an avatar. 
   * @param  {array} coordinates - a list of coordinates
   * @return {array}             - coordinates before ecnountering avatar
   */
  untilEncounterAvatar(coordinates) {
    var flag = true;
    return coordinates.filter(function (coord) {
      if (coord.avatar) {
        flag = false;
      }
      return flag;
    })
  }
}