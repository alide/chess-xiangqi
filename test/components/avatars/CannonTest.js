/*eslint-env node, jasmine */
/*eslint no-console: false*/

import Cannon from 'components/models/avatars/Cannon';
import Coordinate from 'components/models/Coordinate';
import matrix from 'components/models/coordinateMatrix';

/**
 * This Test tests both Chariot and Avatar;
 */


describe('Cannon', ()=> {

  beforeAll(function () {
    this.cannon = matrix.coord(1,2).avatar;    
  })

  afterAll(function () {
    this.cannon.setCoordinate = matrix.coord(1,2);
  })

  it('should be red cannon', function () {
    expect(this.cannon.faction).toBe('red');
    expect(this.cannon).toEqual(jasmine.any(Cannon))
  })

  describe('Bombard', ()=> {
    it('should only have one kill option', function () {
      expect(this.cannon.getKillOptions.length).toBe(1);
    });

    it ('should NOT be able to kill a unit without hopping', function () {
      var target = matrix.coord(1,7).avatar;
      expect(target).toEqual(jasmine.any(Cannon))

      expect(()=> {
        this.cannon.kill(target);
      }).toThrow();

      expect(this.cannon.coordinate.xy).toEqual({x: 1, y: 2});
    });

    it('should be able to kill black Knight', function () {
      var target = matrix.coord(1,9).avatar;

      expect(()=> {
        this.cannon.kill(target);
      }).not.toThrow();

      expect(this.cannon.coordinate.xy).toEqual({x: 1, y: 9});
    });
  })
});