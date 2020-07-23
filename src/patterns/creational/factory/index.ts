abstract class Pizza {
  abstract prepare();
  abstract bake();
  abstract cut();
  abstract box();
}

abstract class PizzaStore {
  orderPizza(name: string): Pizza {
    let pizza: Pizza;
    pizza = this.createPizza(name);
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
    return pizza;
  }
  protected abstract createPizza(name: string): Pizza;
}

class BJCheesePizza extends Pizza {
  prepare() {
    return 'Prepare BJCheesePizza';
  }
  bake() {
    return 'Bake BJCheesePizza';
  }
  cut() {
    return 'Cut BJCheesePizza';
  }
  box() {
    return 'Box BJCheesePizza';
  }
}

class BJPizza extends Pizza {
  prepare() {
    return 'Prepare BJPizza';
  }
  bake() {
    return 'Bake BJPizza';
  }
  cut() {
    return 'Cut BJPizza';
  }
  box() {
    return 'Box BJPizza';
  }
}

class NYCheesePizza extends Pizza {
  prepare() {
    return 'Prepare NYCheesePizza';
  }
  bake() {
    return 'Bake NYCheesePizza';
  }
  cut() {
    return 'Cut NYCheesePizza';
  }
  box() {
    return 'Box NYCheesePizza';
  }
}

class BJPizzaStore extends PizzaStore {
  createPizza(name: string): Pizza {
    let pizza: Pizza;
    switch (name) {
      case 'cheese':
        pizza = new BJCheesePizza();
        break;
      default:
        pizza = new BJPizza();
        break;
    }
    return pizza;
  }
}

class NYPizza extends Pizza {
  prepare() {
    return 'Prepare NYPizza';
  }
  bake() {
    return 'Bake NYPizza';
  }
  cut() {
    return 'Cut NYPizza';
  }
  box() {
    return 'Box NYPizza';
  }
}
class NYPizzaStore extends PizzaStore {
  createPizza(name: string): Pizza {
    let pizza: Pizza;
    switch (name) {
      case 'cheese':
        pizza = new NYCheesePizza();
        break;
      default:
        pizza = new NYPizza();
        break;
    }
    return pizza;
  }
}

export {
  BJCheesePizza,
  BJPizza,
  BJPizzaStore,
  NYPizza,
  NYPizzaStore,
  NYCheesePizza,
  Pizza,
  PizzaStore,
};
