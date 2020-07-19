// abstract class
abstract class Beverage {
  price: number;
  desc: string;
  constructor() {
    this.price = 0;
    this.desc = 'unknow';
  }
  getDesc(): string {
    return this.desc;
  }
  abstract cost(): number;
}

class Coffee extends Beverage {
  price: number;
  desc: string;
  constructor() {
    super();
    this.price = 12;
    this.desc = 'coffee';
  }
  getDesc(): string {
    return this.desc;
  }

  cost(): number {
    return this.price;
  }
}

// abstract condiment decorator class
abstract class BeverageDecorator extends Beverage {
  abstract getDesc(): string;
}

class MochaDecorator extends BeverageDecorator {
  beverage: Beverage;
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }
  getDesc(): string {
    return this.beverage.getDesc() + ', mocha';
  }

  cost(): number {
    return this.beverage.cost() + 5;
  }
}

class WhipDecorator extends BeverageDecorator {
  beverage: Beverage;
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDesc(): string {
    return this.beverage.getDesc() + ', whip';
  }

  cost(): number {
    return this.beverage.cost() + 6;
  }
}

export { Coffee, MochaDecorator, WhipDecorator };
