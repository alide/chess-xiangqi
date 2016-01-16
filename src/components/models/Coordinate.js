import _ from 'lodash';
import config from '../../config/chessConfig'
var {spacing} = config;

class Coordinate {
  constructor (xPoint, yPoint) {
    this.xPoint = xPoint;
    this.yPoint = yPoint;
    this.avatar = null;

    this.view = null;
    this.highlightFaction = '';

    this.state = Coordinate.NORMAL;
  }

  get location() {
    return {
      cx: spacing * this.xPoint,
      cy: spacing * this.yPoint
    }
  }

  set setAvatar(avatar) {
    this.avatar = avatar || null;
  }

  get show() {
    return `Coord x: ${this.xPoint}, y: ${this.yPoint}`;
  }

  highlight(highlightFaction) {
    this.state = Coordinate.HIGHLIGHT;
    this.highlightFaction = highlightFaction;
  }

  isHighlighted() {
    return this.state === Coordinate.HIGHLIGHT;
  }
  
  hide() {
    this.state = Coordinate.NORMAL;
  }
}

_.extend(Coordinate, {
  NORMAL:          'COORD__NORMAL',
  HIGHLIGHT:       'COORD__HIGHLIGHT',
})

export default Coordinate;