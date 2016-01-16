/*eslint-env node, jasmine */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import ChessGame from 'components/models/ChessGame';
import Player from 'components/models/Player';
import _ from 'lodash';
console.log()
describe('MainComponent', () => {
  let game;

  beforeEach(() => {game = new ChessGame; });

  describe("game progression", function () {
    describe("#activePlayer", function () {
      it ('should initially be player1', function () {
        expect(game.activePlayer).toBe(game.player1);
      })

      it ('should oscilate between player1 and player2 on each #switchTurn() call', function () {
        game.switchTurn();
        expect(game.activePlayer).toBe(game.player2);
      })
    })
  })

  describe('game assets', () => {
    it('2 players', () => {
      expect(game.player1).toEqual(jasmine.any(Player))
      expect(game.player1.faction).toEqual('red')
      expect(game.player2).toEqual(jasmine.any(Player))
      expect(game.player2.faction).toEqual('black')
    })

    function playerHaveAllPieces (player) {
      expect(player.avatars.length).toEqual(16)
      expect(_.unique(player.avatars.map((piece)=> piece.name))).toEqual(['車', '马', '相', '士', '将', '炮', '卒'])
    }

    it('player owns at least one of each following piece', () => {
      playerHaveAllPieces(game.player1)
    });
  })
});
