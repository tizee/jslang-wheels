interface Duck {
  quack();
  fly();
}

class MallardDuck implements Duck {
  quack() {
    return 'quack';
  }
  fly() {
    return 'I can fly';
  }
}

interface Turkey {
  gobble();
  fly();
}

class WildTurkey implements Turkey {
  gobble() {
    return 'gobble';
  }
  fly() {
    return "I'm flying a short distance";
  }
}

class TurkeyAdapter implements Duck {
  turkey: Turkey;
  constructor(turkey: Turkey) {
    this.turkey = turkey;
  }
  quack() {
    return 'pretend to quack';
  }
  fly() {
    return "I'm trying to fly a long distance like a duck";
  }
}

export { WildTurkey, Turkey, Duck, MallardDuck, TurkeyAdapter };
