/*eslint-env node, jasmine */
/*eslint no-console: false*/

'use strict';

import Chariot from 'components/avatars/Chariot';
import Coordinate from 'components/models/Coordinate';
import matrix from 'components/models/coordinateMatrix';


describe('Chariot', ()=> {
  let chariot;

  beforeEach(()=> {
    chariot = new Chariot({coordinate: matrix.coord(1,5), player: window.game.player1});
  });

  it('#constructor', ()=> {
    expect(chariot).toEqual(jasmine.any(Chariot));
  });

  it('#location', ()=> {
    expect(chariot.location).toEqual({cx: 50, cy: 250});
  })

  describe('#movesets', ()=> {
    it('getMoveOptions exist', ()=> {
      expect(chariot.getMoveOptions.length).toBe(11);
    });

    describe('corner chariots start with 2 moves each', function() {
      it('upper left corner', function () {
        let cornerChariot = matrix.coord(0,0).avatar;
        expect(cornerChariot.getMoveOptions.length).toBe(2)
      })        

      it('lower right corner', function () {
       let cornerChariot2 = matrix.coord(8,9).avatar;
        expect(cornerChariot2.getMoveOptions.length).toBe(2)
      })  
    })

    describe('move', ()=> {

      it('should throw an error if the intended move is outside of avatar.getMoveOptions', ()=> {
        expect(function() {
          chariot.moveTo(matrix.coord(2, 6));
        }).toThrow()
      });

      it('should throw an error if the intended move is occupied by another piece', ()=> {
        //TODO
      });

      it('should kill an opponent piece if the intended intersection is occupied', () => {
        //TODO
      });

      it ('should move successfully if its a legal play', ()=> {
        chariot.moveTo(matrix.coord(3, 5));
        expect(chariot.coordinate).toBe(matrix.coord(3,5));
        expect(chariot.location).toEqual({cx: 150, cy: 250});
      })
    })
  });
});