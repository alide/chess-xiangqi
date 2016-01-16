/*eslint-env node, jasmine */

function transformerMixin () {
  this.anthem = 'robot in disguise';
  this.transform = function () {
    this.wheels = 0;
  }
}

class Car {
  constructor() {
    this.type = 'car';
    this.wheels = 4;
    this.speed = 0;
  }
}
Car.prototype.drive = function () {
  this.speed = 5;
}

class Transformer extends Car {
  constructor() {
    super()
    transformerMixin.call(this)
  }
}

class HondaCivic extends Transformer {
  constructor() {
    super()
    this.brand = 'honda'
    this.name = 'Rumble'
  }
}

describe("Mixins", function () {
  var carExpectation = function (car) {
    expect(car.type).toBe('car');
    expect(car.wheels).toBe(4);
    expect(car.speed).toBe(0);
    car.drive();
    expect(car.speed).toBe(5)
  }

  beforeEach(function () {
    this.car = new Car
  })

  it("constructor check", function () {
    carExpectation(this.car);
  });

  describe("mixins", function () {
    beforeEach(function () {
      this.transformer = new Transformer
      carExpectation(this.transformer);
    })

    it("should have mixin variable and functions", function() {
      expect(this.transformer.anthem).toBe("robot in disguise")

      this.transformer.transform();
      expect(this.transformer.wheels).toBe(0)
    });
  });

  describe("mixins with inheritance", function () {
    beforeEach(function () {
      this.hondaCivic = new HondaCivic
      carExpectation(this.hondaCivic);
    })

    it("should have mixin variable and functions", function() {
      expect(this.hondaCivic.brand).toBe("honda")
      expect(this.hondaCivic.name).toBe("Rumble")

      this.hondaCivic.transform();
      expect(this.hondaCivic.wheels).toBe(0)
    });
  });

});