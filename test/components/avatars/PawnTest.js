/*eslint-env node, jasmine */
/*eslint no-console: false*/

import Pawn from 'components/models/avatars/Pawn';
import matrix from 'components/models/coordinateMatrix';

describe('Pawn', ()=> {

  beforeAll(function () {
    this.pawn = matrix.coord(0,3).avatar;    
  })

  afterAll(function () {
    this.pawn.setCoordinate = matrix.coord(0,3);
  })

  it('should be red knight', function () {
    expect(this.pawn.faction).toBe('red');
    expect(this.pawn).toEqual(jasmine.any(Pawn))
  })

  it('#hasCrossedRiver', function () {
    expect(this.pawn.hasCrossedRiver).toBe(false);
    this.pawn.setCoordinate = matrix.coord(0,5);
    expect(this.pawn.hasCrossedRiver).toBe(true);
    this.pawn.setCoordinate = matrix.coord(0,3);
  });

  describe('March', ()=> {
    
    it('should only have one move option initially', function () {
      expect(this.pawn.getMoveOptions.length).toBe(1);
    });

    it ('should NOT be able to move more than one block', function () {
      var destination = matrix.coord(0,5);

      expect(()=> {
        this.pawn.moveTo(destination);
      }).toThrow();

      expect(this.pawn.coordinate.xy).toEqual({x: 0, y: 3});
    });

    it ('should NOT be able to move horizontally', function () {
      var destination = matrix.coord(1, 3);

      expect(()=> {
        this.pawn.moveTo(destination);
      }).toThrow();

      expect(this.pawn.coordinate.xy).toEqual({x: 0, y: 3});
    });

    it('should be able to move one block ahead', function () {
      var destination = matrix.coord(0,4);

      expect(()=> {
        this.pawn.moveTo(destination);
      }).not.toThrow();

      expect(this.pawn.coordinate.xy).toEqual({x: 0, y: 4});
    });

    describe('after crossing river', function () {
      beforeAll(function () {
        this.pawn.setCoordinate = matrix.coord(0, 5);
      })
      afterAll(function () {
        this.pawn.setCoordinate = matrix.coord(0, 3);
      })

      it('cannot move backwards', function () {
        var destination = matrix.coord(0, 4);

        expect(()=> {
          this.pawn.moveTo(destination);
        }).toThrow();

        expect(this.pawn.coordinate.xy).toEqual({x: 0, y: 5})
      })

      it('is able to move horizontally one block', function () {
        var destination = matrix.coord(1, 5);

        expect(()=> {
          this.pawn.moveTo(destination);
        }).not.toThrow();

        expect(this.pawn.coordinate.xy).toEqual({x: 1, y: 5})
      })

      it('is able to move forward', function () {
        var destination = matrix.coord(1, 6);

        expect(()=> {
          this.pawn.moveTo(destination);
        }).not.toThrow();

        expect(this.pawn.coordinate.xy).toEqual({x: 1, y: 6})
      });
    })
  });
});