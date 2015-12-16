var toolbox = {
  /**
   *  Converts an Integer to an array of the size populated with index
   */
  stretch: function (size) {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(i);
    }
    return arr;
  },
};

export default toolbox;