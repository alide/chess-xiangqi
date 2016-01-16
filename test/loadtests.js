'use strict';

require('core-js/fn/object/assign');

// Add support for all files in the test directory
const testsContext = require.context('.', true, /(Test\.js$)|(Helper\.js$)/);
testsContext.keys().forEach(testsContext);


// Global variables, setups
import ChessGame from '../src/components/models/ChessGame.js';

window.game = new ChessGame
