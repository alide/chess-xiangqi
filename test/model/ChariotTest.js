'use strict';

import Chariot from '../../src/model/avatars/Chariot.js';

describe('Chariot', ()=> {
  let chariot;

  beforeEach(()=> {
    chariot = new Chariot();
    console.log(chariot)
  });

  it("#constructor", ()=> {
    expect(chariot).toEqual(jasmine.any(Chariot));
  });

  describe('has functions', ()=> {

  });
});