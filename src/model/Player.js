export default class Player {
  constructor({faction} = {}) {
    this.faction = faction;
    this.chesspieces = [];
    this.selectedPiece = null;
  }

  set addPiece(piece) {
    this.chesspieces.push(piece);
    piece.player = this;
  }

  set addPieces(allPieces) {
    allPieces.forEach((piece) => {
      this.addPiece(piece)
    })
  }

  set selectPiece(piece) {
    if (this.chesspieces.find(p => p === piece )) {
      this.selectedPiece = piece;
    }
  }

}