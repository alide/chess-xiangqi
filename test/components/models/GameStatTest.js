function rainCheck () {
  console.log('rain check');
  console.log(this.stat.currentMoveTimeElapsed);
  console.log(this.stat.timeElapsed);
  console.log(this.stat.startTime);
  console.log(this.stat.currentMoveStartTime);
  console.log(this.stat.currentTime);
}

describe('GameStat', function () {


  beforeEach(function () {
    jasmine.clock().install();
    this.game = window.game;
    this.stat = window.game.stat;
    
    // mocking time
    var mockDate = new Date(2016, 2, 6);
    jasmine.clock().mockDate(mockDate);

    // reset this.stat's time to mockTime
    var mockTime = mockDate.getTime();
    this.stat.startTime = mockTime;
    this.stat.currentMoveStartTime = mockTime;
    this.stat.currentTime = mockTime;

    expect((new Date()).getTime()).toEqual(mockTime);
    // console.log('THIS TIME IN SPEC', mockTime)
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  })

  it('sanity check jasmine time', function () {
    var baseTime = new Date(2013, 9, 23);
    jasmine.clock().mockDate(baseTime);
    jasmine.clock().tick(50);
    expect(new Date().getTime()).toEqual(baseTime.getTime() + 50);
  })

  describe("timer", function () {
    beforeEach(function () {
      spyOn(this.stat, 'tick').and.callFake((time)=> {
        // console.log(`FAKE TICKING BY ${time}`)
        jasmine.clock().tick(time);
        this.stat.currentTime = new Date().getTime();
      });
    });

    it("ticks", function () {
      expect(this.stat.getTimer).toBe('00:00:00')
      
      this.stat.tick(4000); //mocked
      this.stat.calculations(); //mocked

      expect(this.stat.getTimer).toBe('00:00:04')
      expect(this.stat.getCurrentMoveTimer).toBe('00:00:04')
    })

    it('resets', function () {
      this.stat.tick(4000); //mocked
      this.stat.currentMoveTimerReset();
      this.stat.tick(6000); //mocked
      this.stat.calculations(); //mocked

      expect(this.stat.getTimer).toBe('00:00:10')
      expect(this.stat.getCurrentMoveTimer).toBe('00:00:06')
    })
  })
})