var webpackCfg = require('./webpack.config');

module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: [ 'PhantomJS' ],
    files: [
      'test/customMatchers.js',
      'test/loadtests.js'
    ],
    port: 8080,
    captureTimeout: 60000,
    frameworks: [ 'phantomjs-shim', 'jasmine', 'chai' ],
    client: {
      jasmine: {}
    },
    singleRun: true,
    reporters: [ 'progress', 'coverage' ],
    preprocessors: {
      'test/loadtests.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html' },
        { type: 'text' }
      ]
    }
  });
};
