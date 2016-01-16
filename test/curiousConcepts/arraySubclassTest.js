/*eslint-env node, jasmine */

import Array2 from 'components/toolbox/Array2';

describe("Array subclass", function () {

  beforeEach(function () {

    this.stack = Array2();
    this.stack.push(1);
    this.stack.push(2);
    this.stack.push(3);
    this.stack.push(4);
  })

  it('expect to have #length 4', function () {
    expect(this.stack.length).toBe(4);
  })

  it('is not window.Array', function () {
    expect(Array2()).not.toBe(window.Array);
    expect(this.stack.constructor).toBe(Array2);
  })

  describe('2-dimensional array', function () {
    beforeEach(function() {
      this.matrix = new Array2(
        [1  , 2  , 3]  , // -> going down  1 4 7 10
        [4  , 5  , 6]  , // v going right  2 5 8 11
        [7  , 8  , 9]  , //                3 6 9 12
        [10 , 11 , 12]  //
      );
    })



    it('throws error if array is not a matrix', function () {
      let ezArray = new Array2(1,2,3);
      expect(ezArray).toEqual([1,2,3]);
    })

    it('can use #row(y) to get a row', function () {
      expect(this.matrix.row(0)).toEqual([1,4,7,10]);
    })

    it('can use #col(x) to get a column', function () {
      expect(this.matrix.col(1)).toEqual([4,5,6]);
    })

    it('can use #coord(x,y) to get a point', function () {
      expect(this.matrix.coord(1,1)).toEqual(5);
    })
  })
});

