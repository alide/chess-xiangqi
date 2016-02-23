/*eslint-env node, jasmine */
/*eslint no-console: false*/

import General from 'components/models/avatars/General';
import matrix from 'components/models/coordinateMatrix';

describe('General', ()=> {

  beforeAll(function () {
    this.general = matrix.coord(4,0).avatar;    
  })

  afterAll(function () {
    this.general.setCoordinate = matrix.coord(4,0);
  })

  it('should be red guard', function () {
    expect(this.general.faction).toBe('red');
    expect(this.general).toEqual(jasmine.any(General))
  })

  describe('CrossGuard', ()=> {
    it('should only have 2 move option', function () {
      expect(this.general.getMoveOptions.length).toBe(1);
      expect(this.general.getMoveOptions).toContain(matrix.coord(4,1))
    });

    it('should be able to move to center of the camp', function () {
      var destination = matrix.coord(4,1);
      expect(()=> {this.general.moveTo(destination)}).not.toThrow();
      expect(this.general.coordinate.xy).toEqual({x: 4, y: 1})

      var horizontal = matrix.coord(3,1);
      expect(()=> this.general.moveTo(horizontal)).not.toThrow();
      expect(this.general.coordinate.xy).toEqual({x: 3, y: 1})
    })

    it('should not be able to move outside of the general camp or more than one block at once', function () {
      var offCamp = matrix.coord(2, 1);
      var othersideOfCamp = matrix.coord(5, 1);
      expect(()=> this.general.moveTo(offCamp)).toThrow();
      expect(()=> this.general.moveTo(othersideOfCamp)).toThrow();

      //stays
      expect(this.general.coordinate.xy).toEqual({x: 3, y: 1});
    })

    it('should be able to kill an opponents avatar in range', function () {
      var target = matrix.coord(0, 9).avatar;
      var destination = matrix.coord(3,2);
      target.setCoordinate = destination;

      expect(()=> {
        this.general.killOn(destination);
      }).not.toThrow();

      expect(this.general.coordinate.xy).toEqual({x: 3, y: 2});
      expect(target.isDeceased()).toBe(true)

      target.setCoordinate = matrix.coord(0, 9);
      target.active();
    })

    describe('#FlyingGeneral', function () {

      beforeAll(function () {
        this.general.setCoordinate = matrix.coord(4,0);    
        this.opponentGeneral = this.general.player.opponent.general;
      })

      afterAll(function () {
        this.opponentGeneral.setCoordinate = matrix.coord(4, 9);
        this.opponentGeneral.active();
      })

      it('should NOT be able to move into an opponents generals clear lane', function () {
        this.general.moveTo(matrix.coord(4,1));
        this.opponentGeneral.moveTo(matrix.coord(4, 8));
        this.general.moveTo(matrix.coord(3,1));
        expect(()=> {
          this.opponentGeneral.moveTo(matrix.coord(3, 8));
        }).toThrow()

        expect(this.opponentGeneral.coordinate.xy).toEqual({x: 4, y: 8})
        this.general.setCoordinate = matrix.coord(4,0);  
        this.opponentGeneral.setCoordinate = matrix.coord(4, 9);
      })

      it('should NOT be able to capture opponents general when units are in the way', function () {
        expect(()=> {
          this.general.kill(this.opponentGeneral)
        }).toThrow();

        expect(this.general.coordinate.xy).toEqual({x: 4, y: 0});
      });

      // Disabled due to request of sebastian
      xit('should be able to capture opponents general in a straight unblocked line', function () {

        this.general.moveTo(matrix.coord(4,1));
        this.opponentGeneral.moveTo(matrix.coord(4, 8));
        this.general.moveTo(matrix.coord(3,1));
        this.opponentGeneral.moveTo(matrix.coord(3, 8));

        expect(()=> {
          this.general.kill(this.opponentGeneral);
        }).not.toThrow();

        expect(this.general.coordinate.xy).toEqual({x: 3, y: 8});
        expect(this.opponentGeneral.isDeceased()).toBe(true);
      })
    })
  })
})