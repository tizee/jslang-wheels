// https://www.typescriptlang.org/docs/handbook/advanced-types.html
class Duck {
  fly() {
    console.log('I can fly');
  }
}
class Dog {
  run() {
    console.log('I can run');
  }
}

type Animal = Duck | Dog;

function getAnimal() {
  return Date.now() % 2 == 0 ? new Duck() : new Dog();
}

let d: Animal = getAnimal();

function isDuck(animal: Animal): animal is Duck {
  return (animal as Duck).fly !== undefined;
}

if (isDuck(d)) {
  d.fly();
} else {
  d.run();
}
