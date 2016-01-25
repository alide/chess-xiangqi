/*eslint-env node, jasmine */
/*eslint no-console: false*/

import Guard from 'components/models/avatars/Guard';
import matrix from 'components/models/coordinateMatrix';

describe('Guard', ()=> {

  beforeAll(function () {
    this.guard = matrix.coord(3,0).avatar;    
  })

  afterAll(function () {
    this.guard.setCoordinate = matrix.coord(3,0);
  })

  it('should be red guard', function () {
    expect(this.guard.faction).toBe('red');
    expect(this.guard).toEqual(jasmine.any(Guard))
  })

  describe('CrossGuard', ()=> {
    it('should only have 1 move option', function () {
      expect(this.guard.getMoveOptions.length).toBe(1);
      expect(this.guard.getMoveOptions).toContain(matrix.coord(4,1))
    });

    it('should NOT be able to move outside of the general camp or more than one diagonal blocks', function () {
      var offCamp = matrix.coord(2, 1);
      var othersideOfCamp = matrix.coord(5, 2);
      expect(()=> this.guard.moveTo(offCamp)).toThrow();
      expect(()=> this.guard.moveTo(othersideOfCamp)).toThrow();

      //stays
      expect(this.guard.coordinate.xy).toEqual({x: 3, y: 0});
    })

    it('should be able to move to center of the grid', function () {
      var destination = matrix.coord(4,1);

      expect(()=> {
        this.guard.moveTo(destination)
      }).not.toThrow();

      expect(this.guard.coordinate.xy).toEqual({x: 4, y: 1})
    })

    it('should be able to kill an opponents avatar in range', function () {
      var target = matrix.coord(0, 9).avatar;
      var destination = matrix.coord(5,2);
      target.setCoordinate = destination;

      expect(()=> {
        this.guard.killOn(destination);
      }).not.toThrow();

      expect(this.guard.coordinate.xy).toEqual({x: 5, y: 2});
      expect(target.isDeceased()).toBe(true)

      target.setCoordinate = matrix.coord(0, 9);
      target.active();
    })
  })
})