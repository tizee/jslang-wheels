abstract class Pizza {
  name: string;
  dough: Dough;
  cheese: Cheese;
  clam: Clam;
  abstract prepare(): void;
  setName(name: string) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

interface Ingredient {
  name: string;
  getName(): string;
}

interface Cheese extends Ingredient {
  /* ... */
}

interface Dough extends Ingredient {
  /* ... */
}

interface Clam extends Ingredient {
  /* ... */
}

class FrozenClam implements Clam {
  name: string;
  constructor() {
    this.name = 'FrozenClam';
  }
  getName() {
    return this.name;
  }
}

class FreshClam implements Clam {
  name: string;
  constructor() {
    this.name = 'FreshClam';
  }
  getName() {
    return this.name;
  }
}

class ThickCrustDough implements Dough {
  name: string;
  constructor() {
    this.name = 'ThickCrustDough';
  }
  getName() {
    return this.name;
  }
}

class ThinCrustDough implements Dough {
  name: string;
  constructor() {
    this.name = 'ThinCrustDough';
  }
  getName() {
    return this.name;
  }
}

class ReggianoCheese implements Cheese {
  name: string;
  constructor() {
    this.name = 'ReggianoCheese';
  }
  getName() {
    return this.name;
  }
}

class GoatCheese implements Cheese {
  name: string;
  constructor() {
    this.name = 'GoatCheese';
  }
  getName() {
    return this.name;
  }
}

class CheesePizza extends Pizza {
  ingredientFactory: PizzaIngredientFactory;
  constructor(ingredientFactory: PizzaIngredientFactory) {
    super();
    this.ingredientFactory = ingredientFactory;
  }
  prepare() {
    this.dough = this.ingredientFactory.createDough();
    this.cheese = this.ingredientFactory.createCheese();
  }
}

class ClamPizza extends Pizza {
  ingredientFactory: PizzaIngredientFactory;
  constructor(ingredientFactory: PizzaIngredientFactory) {
    super();
    this.ingredientFactory = ingredientFactory;
  }
  prepare() {
    this.dough = this.ingredientFactory.createDough();
    this.clam = this.ingredientFactory.createClam();
  }
}

interface PizzaIngredientFactory {
  createCheese();
  createDough();
  createClam();
}

class NYPizzaIngredientFactory implements PizzaIngredientFactory {
  createCheese() {
    return new ReggianoCheese();
  }
  createDough() {
    return new ThickCrustDough();
  }
  createClam() {
    return new FrozenClam();
  }
}

class BJPizzaIngredientFactory implements PizzaIngredientFactory {
  createCheese() {
    return new GoatCheese();
  }
  createDough() {
    return new ThinCrustDough();
  }
  createClam() {
    return new FreshClam();
  }
}

abstract class PizzaStore {
  orderPizza(name: string): Pizza {
    let pizza = this.createPizza(name);
    pizza.prepare();
    return pizza;
  }
  protected abstract createPizza(name: string): Pizza;
}

class BJPizzaStore extends PizzaStore {
  createPizza(name: string) {
    let pizza: Pizza;
    let factory = new BJPizzaIngredientFactory();
    switch (name) {
      case 'cheese':
        pizza = new CheesePizza(factory);
        pizza.setName('BJCheesePizza');
        break;
      case 'clam':
        pizza = new ClamPizza(factory);
        pizza.setName('BJClamPizza');
        break;
    }
    return pizza;
  }
}

class NYPizzaStore extends PizzaStore {
  createPizza(name: string) {
    let pizza: Pizza;
    let factory = new NYPizzaIngredientFactory();
    switch (name) {
      case 'cheese':
        pizza = new CheesePizza(factory);
        pizza.setName('NYCheesePizza');
        break;
      case 'clam':
        pizza = new ClamPizza(factory);
        pizza.setName('NYClamPizza');
        break;
    }
    return pizza;
  }
}

export {
  NYPizzaStore,
  BJPizzaStore,
  FreshClam,
  FrozenClam,
  ThinCrustDough,
  ThickCrustDough,
  ReggianoCheese,
  GoatCheese,
};
