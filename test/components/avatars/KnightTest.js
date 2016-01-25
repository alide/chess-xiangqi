/*eslint-env node, jasmine */
/*eslint no-console: false*/

import Knight from 'components/models/avatars/Knight';
import matrix from 'components/models/coordinateMatrix';

describe('Knight', ()=> {

  beforeAll(function () {
    this.knight = matrix.coord(1,0).avatar;    
  })

  afterAll(function () {
    this.knight.setCoordinate = matrix.coord(1,0);
  })

  it('should be red knight', function () {
    expect(this.knight.faction).toBe('red');
    expect(this.knight).toEqual(jasmine.any(Knight))
  })

  describe('SunFormation', ()=> {
    it('should only have 2 move option', function () {
      expect(this.knight.getMoveOptions.length).toBe(2);
      expect(this.knight.getMoveOptions).toContain(matrix.coord(0, 2))
      expect(this.knight.getMoveOptions).toContain(matrix.coord(2, 2))
    });

    it ('should NOT be able to move across with stepping stone', function () {
      var destination = matrix.coord(3,1);

      expect(()=> {
        this.knight.moveTo(destination);
      }).toThrow();

      expect(this.knight.coordinate.xy).toEqual({x: 1, y: 0});
    });

    it('should be able to move across without stepping stone', function () {
      var destination = matrix.coord(2,2);

      expect(()=> {
        this.knight.moveTo(destination);
      }).not.toThrow();

      expect(this.knight.coordinate.xy).toEqual({x: 2, y: 2});
    });

    it('should be able to kill an enemy avatar if its within move option', function () {
      var target = matrix.coord(0, 9).avatar;
      var destination = matrix.coord(4,1);
      target.setCoordinate = destination;

      expect(()=> {
        this.knight.killOn(destination);
      }).not.toThrow();

      expect(this.knight.coordinate.xy).toEqual({x: 4, y: 1});
      expect(target.isDeceased()).toBe(true)

      target.setCoordinate = matrix.coord(0, 9);
      target.active();
    })
  })
});