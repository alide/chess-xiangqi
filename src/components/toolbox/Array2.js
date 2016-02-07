import _ from 'lodash'
import tools from 'components/toolbox/tools'
import avatarsInfo from 'components/models/avatars/avatarsInfo'

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
  },

  debug: function () {
    return tools.expand(10).map((rowNum) => {
      return this.row(rowNum).map((coord) => {
        return coord.avatar ? avatarsInfo.initials[coord.avatar.name] : '+';
      }).join(' ');
    }).join('\n');
  },

  diff: function(intended_matrix) {
    // diff the avatars block by block gives '-' for expected and '+' for unexpected
  },
})


export default Array2;