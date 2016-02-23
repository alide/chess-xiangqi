/*eslint-env node, jasmine */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import ChessGame from 'components/models/ChessGame';
import Player from 'components/models/Player';
import _ from 'lodash';
import MainView from 'components/main'
console.log()
describe('ChessGame', () => {
  let game;

  beforeEach(() => {game = new ChessGame(new MainView);});

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

    it('player owns at least one of each following piece', () => {
      expect(game.player1.avatars.length).toEqual(16)
      expect(_.unique(game.player1.avatars.map((piece)=> piece.getName))).toEqual(['车', '马', '相', '士', '帥', '炮', '兵'])
      expect(_.unique(game.player1.avatars.map((piece)=> piece.name))).toEqual(['Chariot', 'Knight', 'Minister', 'Guard', 'General', 'Cannon', 'Pawn'])
      expect(game.player2.avatars.length).toEqual(16)
      expect(_.unique(game.player2.avatars.map((piece)=> piece.getName))).toEqual(['車', '馬', '象', '仕', '將', '炮', '卒'])
      expect(_.unique(game.player2.avatars.map((piece)=> piece.name))).toEqual(['Chariot', 'Knight', 'Minister', 'Guard', 'General', 'Cannon', 'Pawn'])
    });
  })

  describe('#reset', ()=> {
    let coord_8_0, redChariot;

    beforeEach(()=> {
      coord_8_0 = game.coordinates.coord(8, 0);
      redChariot = coord_8_0.avatar;
      redChariot.moveTo(game.coordinates.coord(8, 1));
      game.reset({forceUpdate: function() {}});
    })

    it('does not change number of chesspieces', function () {
      expect(game.getAvatars.length).toBe(32);
      expect(game.player1.avatars.length).toBe(16);
      expect(game.player2.avatars.length).toBe(16);
    });

    it('resets corresponding chariots to their original position', function() {
      expect(coord_8_0.avatar.name).toBe('Chariot')
    });
  })

  describe('#debug', ()=> {
    it('should give visual outline of the initial state of game', function() {
      expect(game.coordinates.debug()).toBe(
        [
          `C K M D G D M K C`,
          `+ + + + + + + + +`,
          `+ A + + + + + A +`,
          `P + P + P + P + P`,
          `+ + + + + + + + +`,
          `+ + + + + + + + +`,
          `P + P + P + P + P`,
          `+ A + + + + + A +`,
          `+ + + + + + + + +`,
          `C K M D G D M K C`
        ].join('\n')
      )
    })

    describe('after a standard opening', function() {
      beforeEach(function() {
        // cannon
        game.coordinates.coord(7, 2).avatar.moveTo(game.coordinates.coord(4, 2));

        // defending black knight
        game.coordinates.coord(7, 9).avatar.moveTo(game.coordinates.coord(6, 7));
      })

      it('should give visual outline of the current state of game', function() {
        expect(game.coordinates.debug()).toBe(
          [
            `C K M D G D M K C`,
            `+ + + + + + + + +`,
            `+ A + + A + + + +`,
            `P + P + P + P + P`,
            `+ + + + + + + + +`,
            `+ + + + + + + + +`,
            `P + P + P + P + P`,
            `+ A + + + + K A +`,
            `+ + + + + + + + +`,
            `C K M D G D M + C`
          ].join('\n')
        );
      })
    })
  })
})
