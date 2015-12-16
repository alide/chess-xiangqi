import toolbox from './toolbox'
import _ from 'lodash'

import generateAllPieces from './avatars/generateAllPieces'

class Point {
  constructor (xPoint, yPoint, spacing) {
    this.xPoint = xPoint;
    this.yPoint = yPoint;
    this.spacing = spacing;

    // States:
    // highlight
    this.state = 'normal'
  }
}


class Grid {
  get STARTING_LINE_UP() {
    return [
    ];
  }

  constructor({x: xCount,y: yCount, spacing} = props) { //9, 8, 50
    this.xCount = xCount;
    this.yCount = yCount;
    this.spacing = spacing;

    this.xGrids = toolbox.stretch(xCount);
    this.yGrids = toolbox.stretch(yCount);

    this.points = [];
    this.generatePoints();

    this.verticalLines = this.xGrids.map((x)=> {
      return {
        key: `x${x}`,
        x1: x * this.spacing,
        y1: 0,
        x2: x * this.spacing,
        y2: this.spacing * (this.yCount-1),
      }
    })

    this.horizontalLines = this.yGrids.map((y)=> {
      return {
        key: `y${y}`,
        x1: 0,
        y1: y * this.spacing,
        x2: this.spacing * (this.xCount-1),
        y2: y * this.spacing
      }
    })

    this.river = {
      width: this.spacing * (this.xCount-1),
      height: this.spacing,
    }

    this.riverContent = {
      transform: `translate(0, ${this.spacing * 4})`
    }

    this.campLines = [
      {x1: 3 * this.spacing, y1: 0, x2: 4 * this.spacing, y2: this.spacing},
      {x1: 5 * this.spacing, y1: 0, x2: 4 * this.spacing, y2: this.spacing},
      {x1: 3 * this.spacing, y1: 2 * this.spacing, x2: 4 * this.spacing, y2: this.spacing},
      {x1: 5 * this.spacing, y1: 2 * this.spacing, x2: 4 * this.spacing, y2: this.spacing},

      {x1: 3 * this.spacing, y1: 9 * this.spacing, x2: 4 * this.spacing, y2: 8 * this.spacing},
      {x1: 5 * this.spacing, y1: 9 * this.spacing, x2: 4 * this.spacing, y2: 8 * this.spacing},
      {x1: 3 * this.spacing, y1: 7 * this.spacing, x2: 4 * this.spacing, y2: 8 * this.spacing},
      {x1: 5 * this.spacing, y1: 7 * this.spacing, x2: 4 * this.spacing, y2: 8 * this.spacing}
    ]

    this.chesspieces = generateAllPieces.call(this);

  }

  generatePoints() {
    this.points = this.xGrids.map((xPoint)=> {
      return this.yGrids.map((yPoint)=> {
        return new Point(xPoint, yPoint, this.spacing);
      })
    })
  }

  findPoint(x, y) {
    var xInRange = this.points[x];
    return xInRange && xInRange[y];
  }

  // findPoints({x,y}) {
  //   this.points.filter((xArray, xCoord)=> {
  //     return xArray.find((point, yCoord)=> {
  //       return xCoord === x && yCoord === y
  //     })
  //   })
  // }
}

export default Grid