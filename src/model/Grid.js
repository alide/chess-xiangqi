import Point from './Point'
import toolbox from './toolbox'
import River from './prosthetics/River'

class Grid {
  get STARTING_LINE_UP() {
    return [
    ];
  }

  constructor({x: xCount,y: yCount, spacing, boardPadding} = props) { //9, 8, 50
    this.xCount = xCount;
    this.yCount = yCount;
    this.spacing = spacing;
    this.boardPadding = boardPadding;

    this.xGrids = toolbox.stretch(xCount);
    this.yGrids = toolbox.stretch(yCount);

    this.points = [];
    this.generatePoints();

    this.buildBoard();


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

  }

  buildBoard() {
    this.river = new River({
      boardPadding: this.boardPadding,
      riverPadding: this.spacing * 4,
      width: this.spacing * (this.xCount-1),
      height: this.spacing
    });
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

  /**
    This is no longer being used
   */
  findPoints({x,y}) {
    this.points.filter((xArray, xCoord)=> {
      return xArray.find((point, yCoord)=> {
        return xCoord === x && yCoord === y
      })
    })
  }

}

export default Grid