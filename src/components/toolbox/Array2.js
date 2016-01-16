var iframe = document.createElement('iframe');
iframe.style.display='none';
document.body.appendChild(iframe);
let Array2 = iframe.contentWindow.Array;


Object.assign(Array2.prototype, {
  isMatrix: function () {
    return this[0].length;
  },
  col: function (x) {
    return this[x];
  },
  row: function (y) {
    return this.map(function(col) {
      return col[y];
    });
  },
  coord: function (x, y) {
    return this[x][y];
  },
  all: function() {
    return _.flatten(this);
  }
})


export default Array2;