/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import ChessGame from '../../src/model/ChessGame';
import Player from '../../src/model/Player';
import _ from 'lodash';

describe('MainComponent', () => {
  let game;

  beforeEach(() => {
    game = new ChessGame;
  });

  describe('game assets', () => {
    it('2 players', () => {
      expect(game.player1).toEqual(jasmine.any(Player))
      expect(game.player1.faction).toEqual('red')
      expect(game.player2).toEqual(jasmine.any(Player))
      expect(game.player2.faction).toEqual('black')
    })

    function playerHaveAllPieces (player) {
      expect(player.chesspieces.length).toEqual(16)
      expect(_.unique(player.chesspieces.map((piece)=> piece.name))).toEqual([
        '車',
        '马',
        '相',
        '士',
        '将',
        '炮',
        '卒'
      ])
    }

    it('player owns at least one of each following piece', () => {
      playerHaveAllPieces(game.player1)
    });

  })
});
