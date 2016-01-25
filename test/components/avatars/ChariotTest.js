/*eslint-env node, jasmine */
/*eslint no-console: false*/

import Chariot from 'components/models/avatars/Chariot';
import Cannon from 'components/models/avatars/Cannon';
import Coordinate from 'components/models/Coordinate';
import matrix from 'components/models/coordinateMatrix';

/**
 * This Test tests both Chariot and Avatar;
 */


describe('Chariot', ()=> {
  let chariot, startingCoord = matrix.coord(0,0);

  beforeAll(() => chariot = startingCoord.avatar)
  beforeEach(()=> {chariot.setCoordinate = matrix.coord(1, 5) });
  afterAll(() => chariot.setCoordinate = startingCoord)

  it('#constructor', ()=> {
    expect(chariot).toEqual(jasmine.any(Chariot));
  });

  it('#location', ()=> {
    expect(chariot.location).toEqual({cx: 50, cy: 250});
  })

  describe('as an Avatar', function () {
    it('should initially be active', function () {
      expect(chariot.isActive()).toBe(true);
      chariot.deceased();
      expect(chariot.isDeceased()).toBe(true);
    })
  })

  describe('#movesets', ()=> {
    it('getMoveOptions exist', ()=> { 
      expect(chariot.getMoveOptions.length).toBe(11);
    });

    describe('corner chariots start with 2 moves each', function() {
      it('upper left corner', function () {
        let cornerChariot = matrix.coord(8,0).avatar;
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

      it ('should move successfully if its a legal play', ()=> {
        chariot.moveTo(matrix.coord(3, 5));
        expect(chariot.coordinate).toBe(matrix.coord(3,5));
        expect(chariot.location).toEqual({cx: 150, cy: 250});
      })
    })

    describe('movekill', ()=> {
      let targettedCannon, targettedPawn;
      beforeAll(function () {
        targettedCannon = matrix.coord(1, 7).avatar;
        targettedPawn = matrix.coord(0,6).avatar;
      })

      beforeEach(function () {
        // cheating and turning back time
        chariot.setCoordinate = matrix.coord(1, 6);

        targettedCannon.active();
        targettedCannon.setCoordinate = matrix.coord(1, 7);
        targettedPawn.active();
        targettedPawn.setCoordinate = matrix.coord(0, 6);

        expect(matrix.coord(1, 7).avatar).toEqual(jasmine.any(Cannon))
      })

      it('should kill an opponent piece if the intended intersection is occupied', () => {
        var origin = chariot.coordinate;
        var destination = matrix.coord(1, 7);
        var destinationOccupant = destination.avatar;

        chariot.killOn(destination);
        expect(chariot.coordinate).toEqual(destination)
        expect(destinationOccupant.isDeceased()).toBe(true)
        expect(origin.avatar).toBe(null);
      });

      it('should kill an opponent piece if the intended intersection is occupied 2', () => {
        var origin = chariot.coordinate;
        var destination = matrix.coord(0, 6)
        var destinationOccupant = destination.avatar;

        chariot.killOn(destination);
        expect(chariot.coordinate).toEqual(destination)
        expect(destinationOccupant.isDeceased()).toBe(true)
        expect(origin.avatar).toBe(null);
      });

      it('should not be able to kill empty coordinate', function () {
        expect(function () {
          chariot.killOn(matrix.coord(1, 4))
        }).toThrow();
      })

      it('should not be able to kill through first encounter', function () {
        expect(function () {
          chariot.killOn(matrix.coord(1, 9))
        }).toThrow();
      })

      it('friendly fire should not be tolerated', function () {
        expect(function () {
          chariot.killOn(matrix.coord(1, 2))
        }).toThrow();
      })

      it('shouldnt be able to kill random piece across board', function () {
        expect(function () {
          chariot.killOn(matrix.coord(7, 9))
        }).toThrow();
      })
    })
  });
});