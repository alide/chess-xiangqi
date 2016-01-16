/*eslint-env node, jasmine */

var spy = jasmine.createSpy();

class Video {
  constructor() {
    this.duration = 10;
  }

  get getDuration() {
    spy();
    return this.duration;
  }
}

var video = new Video;

describe("getters", function () {
  it("no caching on the result", function() {
    expect(video.getDuration).toBe(10);
    expect(video.getDuration).toBe(10);
    expect(video.getDuration).toBe(10);
    expect(spy.calls.count()).toEqual(3);
  })

  afterEach(function() {
    spy.calls.reset();
    expect(spy.calls.count()).toEqual(0);
  })
});


describe("setters", function () {

})