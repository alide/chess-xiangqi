var tools = {
  /**
   *  Converts an Integer to an array of the size populated with index
   */
  expand: function (size) {
    if (!Number.isInteger(size) || size <= 0) {
      throw new Error('tools.expand expects a positive integer (size)')
    }
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(i);
    }
    return arr;
  },

  /**
   *  Dissect an Array at indices
   */
  dissect: function (array, ...indices) {
    if (indices.some(index=> index > array.length || index < 0)) {
       throw new Error('tools.dissect expecting indices within rangem of 0 to array.length + 1');
    }
    indices.unshift(0)
    indices.push(array.length)
    return tools.every(2) (indices, function (index1, index2) {
      return array.slice(index1, index2);
    });
  },

  /**
   * @param  {groupsOf} - every this many elements in adjacence
   * @return {function(arr, callback)}
   */
  every: function (groupsOf) {
    return function (arr, callback) {
      let ending = arr.length - groupsOf;
      var newArr = []
      for (let i = 0; i <= ending; i++) {
        let group = arr.slice(i, i + groupsOf);
        newArr.push(callback.apply(this, group))
      }
      return newArr;
    }
  },

  acceptUntil: function (arr, callback, context) {
    var flag = true;
    return arr.filter(function (item) {
      if (callback.call(context, item)) {
        flag = false;
      }
      return flag;
    });
  }
};

export default tools;