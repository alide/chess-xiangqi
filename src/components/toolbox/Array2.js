import _ from 'lodash'

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
    try {
      return this[x][y];
    }
    catch(e) {
      return null;
    }
  },
  all: function() {
    return _.flatten(this);
  },
  extinguish: function () {
    return this.all().map(coord => coord.hidden());
  }
})


export default Array2;