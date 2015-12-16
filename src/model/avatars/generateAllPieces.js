import Chariot from './chariot'
import Knight from './knight'
import Minister from './minister'
import Guard from './guard'
import General from './general'
import Cannon from './cannon'
import Pawn from './pawn'

function generateAllPieces() {
  var spacing = this.spacing;
  var points = this.points;

  return [
    new Chariot({
      faction: 'red',
      point: this.points[0][0]
    }),
    new Chariot({
      faction: 'red',
      point: this.points[8][0]
    }),
    new Chariot({
      faction: 'black',
      point: this.points[0][9]
    }),
    new Chariot({
      faction: 'black',
      point: this.points[8][9]
    }),

    new Knight({
      faction: 'red',
      point: this.points[1][0]
    }),
    new Knight({
      faction: 'red',
      point: this.points[7][0]
    }),
    new Knight({
      faction: 'black',
      point: this.points[1][9]
    }),
    new Knight({
      faction: 'black',
      point: this.points[7][9]
    }),

    new Minister({
      faction: 'red',
      point: this.points[2][0]
    }),
    new Minister({
      faction: 'red',
      point: this.points[6][0]
    }),
    new Minister({
      faction: 'black',
      point: this.points[2][9]
    }),
    new Minister({
      faction: 'black',
      point: this.points[6][9]
    }),

    new Guard({
      faction: 'red',
      point: this.points[3][0]
    }),
    new Guard({
      faction: 'red',
      point: this.points[5][0]
    }),
    new Guard({
      faction: 'black',
      point: this.points[3][9]
    }),
    new Guard({
      faction: 'black',
      point: this.points[5][9]
    }),

    new General({
      faction: 'red',
      point: this.points[4][0]
    }),
    new General({
      faction: 'black',
      point: this.points[4][9]
    }),

  ]
}



export default generateAllPieces