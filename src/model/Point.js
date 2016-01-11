import _ from 'lodash';

class Point {
  constructor (xPoint, yPoint, spacing) {
    this.xPoint = xPoint;
    this.yPoint = yPoint;
    this.spacing = spacing;

    this.state = Point.NORMAL;
  }
}

_.extend(Point, {
  NORMAL:          'POINT__NORMAL',
  HIGHLIGHT:       'POINT__HIGHLIGHT',
  HIGHLIGHT_HOVER: 'HIGHLIGHT_HOVER'
})

export default Point;