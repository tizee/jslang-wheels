abstract class CaffeinBeverage {
  // template-method
  prepareRecipe() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    if (this.addHook()) {
      this.addCondiments();
    }
  }
  abstract brew(): void;
  abstract addCondiments(): void;

  addHook() {
    return true;
  }

  boilWater() {
    console.log('Boil water');
  }
  pourInCup() {
    console.log('Pouring into cup');
  }
}

class Coffee extends CaffeinBeverage {
  add: boolean;
  addHook() {
    return this.add;
  }
  constructor(add: boolean) {
    super();
    this.add = add;
  }
  brew() {
    console.log('Dripping coffee throught filter');
  }
  addCondiments() {
    console.log('Adding sugar and milk');
  }
}

class Tea extends CaffeinBeverage {
  add: boolean;
  addHook() {
    return this.add;
  }
  constructor(add: boolean) {
    super();
    this.add = add;
  }
  brew() {
    console.log('Steeping the tea');
  }
  addCondiments() {
    console.log('Adding Lemon');
  }
}

export { Coffee, Tea, CaffeinBeverage };
