/*eslint-env node, jasmine */
/*eslint no-console: false*/

import Minister from 'components/models/avatars/Minister';
import matrix from 'components/models/coordinateMatrix';

describe('Minister', ()=> {

  beforeAll(function () {
    this.minister = matrix.coord(2,0).avatar;    
  })

  afterAll(function () {
    this.minister.setCoordinate = matrix.coord(1,0);
  })

  it('should be red knight', function () {
    expect(this.minister.faction).toBe('red');
    expect(this.minister).toEqual(jasmine.any(Minister))
  })

  describe('FieldFormation', ()=> {
    it('should only have 2 move option', function () {
      expect(this.minister.getMoveOptions.length).toBe(2);
      expect(this.minister.getMoveOptions).toContain(matrix.coord(0,2))
      expect(this.minister.getMoveOptions).toContain(matrix.coord(4,2))
    });

    it ('should NOT be able to move across with stepping stone', function () {
      var destination = matrix.coord(0,2);
      matrix.coord(0,0).avatar.setCoordinate = matrix.coord(1, 1);

      expect(()=> {
        this.minister.moveTo(destination);
      }).toThrow();

      expect(this.minister.coordinate.xy).toEqual({x: 2, y: 0});
      matrix.coord(1,1).avatar.setCoordinate = matrix.coord(0, 0);
    });

    it('should be able to move across without stepping stone', function () {
      var destination = matrix.coord(0,2);

      expect(()=> {
        this.minister.moveTo(destination);
      }).not.toThrow();

      expect(this.minister.coordinate.xy).toEqual({x: 0, y: 2});
    });

    it('should be able to kill an opponent in range of field formation', function () {
      var target = matrix.coord(0,9).avatar;
      var destination = matrix.coord(2,4);
      target.setCoordinate = destination;

      expect(()=> {
        this.minister.killOn(destination);
      }).not.toThrow();
      expect(this.minister.coordinate.xy).toEqual({x: 2, y: 4})

      target.setCoordinate = matrix.coord(0,9);
    });

    it('should NOT be able to move across river', function () {
      var destination = matrix.coord(0,6);
      expect(()=> {
        this.minister.moveTo(destination);
      }).toThrow();
      expect(this.minister.coordinate.xy).toEqual({x: 2, y: 4});
    })
  })
});