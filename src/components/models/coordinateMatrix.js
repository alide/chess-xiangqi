import Coordinate from './Coordinate'

import Array2 from '../toolbox/Array2'
import {chess} from '../../config/chessConfig';
var {horizontalGrids, verticalGrids} = chess;

let coordinateMatrix = new Array2(
  ...horizontalGrids.map((xPoint) => {
    return verticalGrids.map((yPoint) => {
      return new Coordinate(xPoint, yPoint);
    })
  })
)
export default coordinateMatrix;