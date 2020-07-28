abstract class CaffeinBeverage {
  // template-method
  prepareRecipe() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  }
  abstract brew(): void;
  abstract addCondiments(): void;

  boilWater() {
    console.log('Boil water');
  }
  pourInCup() {
    console.log('Pouring into cup');
  }
}

class Coffee extends CaffeinBeverage {
  brew() {
    console.log('Dripping coffee throught filter');
  }
  addCondiments() {
    console.log('Adding sugar and milk');
  }
}

class Tea extends CaffeinBeverage {
  brew() {
    console.log('Steeping the tea');
  }
  addCondiments() {
    console.log('Adding Lemon');
  }
}

export { Coffee, Tea, CaffeinBeverage };
