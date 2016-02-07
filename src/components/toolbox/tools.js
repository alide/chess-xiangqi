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
  },

  // an oversimplified state toggler defined on the Class that calls this routine;
  // extends to child classes
  defineState: function (klass, states, stateChangeCallback) {
    if (!states.length) {throw new Error('need multiple states'); }
    else if(!klass.name) { throw new Error('constructor doesnt have a name'); }
    else if (!klass) {throw new Error('class undefined') }

    klass.STATES = {};
    states.forEach((stateName)=> {
      let capState =  stateName[0].toUpperCase() + stateName.slice(1);

      klass.STATES[stateName] = `${klass.name}_STATE__${stateName}`;

      // Define isStateofcompletion();
      klass.prototype[`is${capState}`] = function () {
        return this.state === klass.STATES[stateName]
      };

      // define change state
      klass.prototype[stateName] = function (localCallback) {
        this.state = klass.STATES[stateName];
        stateChangeCallback && stateChangeCallback.call(this, stateName);
        localCallback && localCallback.call(this, stateName);
      }

      // initialize state to first of states
      klass.prototype.state = klass.prototype.state || klass.STATES[stateName];
    });

  },

  cx: function (classNames) {
    var returnClassName = []
    for (let className in classNames) {
      if (classNames[className]) {
        returnClassName.push(className);
      }
    }
    return returnClassName.join(' ');
  },

  zeroPad: function (timeNumber) {
    return ('0'+timeNumber).slice(-2)
  }

};

export default tools;