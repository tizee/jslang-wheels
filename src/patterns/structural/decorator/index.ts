/**
 * Decorator pattern:
 * 1. We donot have to modfiy the low-level code or inherit the super class to add new behavior
 * 2. We need re-implement the method getDesc and cost in decorator class (not the abstract Decorator class).
 *
 * 抽象组件-具体组件，修饰器抽象类（继承抽象组件）-具体的实现
 * 作用：
 * 1. 可以给同一对象添加若干个修饰器
 * 2. 修饰器可以在被修饰对象行为之前之后加上自己的行为，以实现某种目的
 * 2. 可以运行时动态地，不限量的使用修饰器
 *
 * 注意：不一定需要继承实现
 *  抽象修饰者组件与被修饰者组件有相同的超类(super class)，主要是为了借助继承达到类型匹配，而不是利用继承获得行为，通过组合来增加新的行为，见下面代码
 *
 */
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
