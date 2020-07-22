abstract class Duck {
  flyBehavior: FlyBehavior;
  performFly() {
    // delegate to this.flyBehavior
    return this.flyBehavior.fly();
  }
  abstract display();
  setFlyBehavior(newBehavior: FlyBehavior) {
    this.flyBehavior = newBehavior;
  }
}

interface FlyBehavior {
  fly();
}

class FlyWithWings implements FlyBehavior {
  fly() {
    return 'I can fly with wings';
  }
}

class FlyNoWay implements FlyBehavior {
  fly() {
    return "I can't fly";
  }
}

class WildDuck extends Duck {
  constructor() {
    super();
    this.flyBehavior = new FlyWithWings();
  }
  display() {
    console.log("I'm a wild duck.");
  }
}

class DuckLearnFly extends Duck {
  constructor() {
    super();
    this.flyBehavior = new FlyNoWay();
  }
  display() {
    console.log('I can do it.');
  }
}

export { WildDuck, DuckLearnFly, FlyWithWings };
