/*eslint-env node, jasmine */
/*eslint no-console: false*/

import tools from 'components/toolbox/tools';
let {expand} = tools;

describe('.expand', function () {
  it('should turn 6 into [0,1,2,3,4,5]', function () {
    expect(expand(6)).toEqual([0,1,2,3,4,5])
  })
})

describe('.dissect', function () {
  let {dissect} = tools;

  it('if index is valid, should dissect array into two array (with second array starting at index)', function () {
    var org = [0,1,2,3,4,5]
    expect(dissect(org, 3)).toEqual([[0,1,2], [3,4,5]]);
  })

  it('actual vertical board' , function () {
    var org = [0,1,2,3,4,5,6,7,8,9];
    expect(dissect(org, 5, 6)).toEqual([[0,1,2,3,4],[5],[6,7,8,9]])
  })

  it('if indices are all valid, should dissect array into (indices + 1) arrays', function () {
    var org = [0,1,2,3,4,5,6,7,8,9,10];
    expect(dissect(org, 3,5,7)).toEqual([[0,1,2],[3,4],[5,6],[7,8,9,10]]);

    // demo in natural numbers
    var org = [1,2,3,4,5,6,7,8,9,10,11];
    expect(dissect(org, 3,5,7)).toEqual([[1,2,3],[4,5],[6,7],[8,9,10,11]]);
  })

  it('if any index out of bound, return original array', function () {
    var org = [0,1,2,3,4];

    // without wrapper, this spec wont catch and error will be caught in the spec.
    expect(function() {
      dissect(org, 10) 
    }).toThrow();
  })
})


describe('.every', function () {
  let {every} = tools;
  var arr = [1,2,3,4,5,6,7,8];

  describe('happy path', function () {
    it('performs the function for every 2 adjacent elements', function () {
      expect(every(2) (arr, function (a, b) {
        return a + b;
      })).toEqual([3,5,7,9,11,13,15]);
    })

    it('performs the function for every 3 adjacent elements', function () {
      expect(every(3) (arr, function (a, b, c) {
        return a + b + c;
      })).toEqual([6,9,12,15,18,21]);
    })

    it('performs the function for every 4 adjacent elements', function () {
      expect(every(4) (arr, function (a, b, c, d) {
        return a + b + c + d;
      })).toEqual([10, 14, 18, 22, 26]);
    })
  })
})

let {acceptUntil} = tools;

describe('.acceptUntil', function () {
  var arr = tools.expand(8);
  
  it('should have values 0 to 4', function () {
    expect(acceptUntil(arr, val => val > 4)).toEqual([0,1,2,3,4])
  })
})