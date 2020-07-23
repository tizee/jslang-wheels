abstract class Pizza {
  abstract prepare();
  abstract bake();
  abstract cut();
  abstract box();
}

class PizzaStore {
  private pizzaFactory: PizzaFactory;
  constructor() {
    this.pizzaFactory = new PizzaFactory();
  }

  orderPizza(type: string): Pizza {
    let pizza: Pizza;
    pizza = this.pizzaFactory.createPizza(type);
    return pizza;
  }
}

class PizzaFactory {
  createPizza(type: string): Pizza {
    let pizza: Pizza;
    switch (type) {
      case 'cheese':
        pizza = new CheesePizza();
        break;
      case 'clam':
        pizza = new ClamPizza();
        break;
      default:
        pizza = new CheesePizza();
        break;
    }
    return pizza;
  }
}

class ClamPizza extends Pizza {
  prepare() {
    return 'Prepare ClamPizza';
  }
  bake() {
    return 'Bake ClamPizza';
  }
  cut() {
    return 'Cut ClamPizza';
  }
  box() {
    return 'Box ClamPizza';
  }
}

class CheesePizza extends Pizza {
  prepare() {
    return 'Prepare CheesePizza';
  }
  bake() {
    return 'Bake CheesePizza';
  }
  cut() {
    return 'Cut CheesePizza';
  }
  box() {
    return 'Box CheesePizza';
  }
}

export { PizzaStore, CheesePizza, ClamPizza, Pizza };
