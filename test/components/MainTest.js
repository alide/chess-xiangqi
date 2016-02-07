/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
import createComponent from 'helpers/shallowRenderHelper';

import Main from 'components/main';

describe('MainComponent', () => {
  let MainComponent;

  beforeEach(() => {
    MainComponent = createComponent(Main);
  });

  it('1 + 1 should be troo', () => {
    expect(1+1).toEqual(2);
  });
});
