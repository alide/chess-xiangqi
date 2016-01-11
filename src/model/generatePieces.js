import Chariot from './avatars/Chariot'
import Knight from './avatars/Knight'
import Minister from './avatars/Minister'
import Guard from './avatars/Guard'
import General from './avatars/General'
import Cannon from './avatars/Cannon'
import Pawn from './avatars/Pawn'


function generatePieces(player) {
  var points = this.points;
  var {faction} = player;

  if (faction === 'red') {
    var redPieces = [
      new Chariot({point: points[0][0]}),
      new Chariot({point: points[8][0]}),

      new Knight({point: points[1][0]}),
      new Knight({point: points[7][0]}),

      new Minister({point: points[2][0]}),
      new Minister({point: points[6][0]}),

      new Guard({point: points[3][0]}),
      new Guard({point: points[5][0]}),

      new General({point: points[4][0]}),

      new Cannon({point: points[1][2]}),
      new Cannon({point: points[7][2]}),

      new Pawn({point: points[0][3]}),
      new Pawn({point: points[2][3]}),
      new Pawn({point: points[4][3]}),
      new Pawn({point: points[6][3]}),
      new Pawn({point: points[8][3]})
    ]

    redPieces.map((piece) => {
      piece.faction = 'red';
      piece.player = player;
    })
    return redPieces;
  }
  else if (faction === 'black') {
    var blackPieces = [
      new Chariot({point: points[0][9] }),
      new Chariot({point: points[8][9] }),

      new Knight({point: points[1][9] }),
      new Knight({point: points[7][9] }),

      new Minister({point: points[2][9] }),
      new Minister({point: points[6][9] }),

      new Guard({point: points[3][9] }),
      new Guard({point: points[5][9] }),

      new General({point: points[4][9] }),

      new Cannon({point: points[1][7]}),
      new Cannon({point: points[7][7]}),

      new Pawn({point: points[0][6]}),
      new Pawn({point: points[2][6]}),
      new Pawn({point: points[4][6]}),
      new Pawn({point: points[6][6]}),
      new Pawn({point: points[8][6]})
    ]

    blackPieces.map((piece) => {
      piece.faction = 'black';
      piece.player = player;
    })
    return blackPieces;
  }
}



export default generatePieces