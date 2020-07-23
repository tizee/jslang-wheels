import {
  PizzaStore,
  CheesePizza,
  ClamPizza,
  Pizza,
} from '../creational/simple-factory';

describe('Simple Factory', () => {
  test('should bake kinds of pizza', () => {
    let store = new PizzaStore();
    let pizza1 = store.orderPizza('cheese');
    expect(pizza1 instanceof CheesePizza).toBe(true);
    expect(pizza1 instanceof Pizza).toBe(true);
    expect(pizza1.prepare()).toBe('Prepare CheesePizza');
    expect(pizza1.bake()).toBe('Bake CheesePizza');
    expect(pizza1.cut()).toBe('Cut CheesePizza');
    expect(pizza1.box()).toBe('Box CheesePizza');
    let pizza2 = store.orderPizza('clam');
    expect(pizza2 instanceof ClamPizza).toBe(true);
    expect(pizza2 instanceof Pizza).toBe(true);
    expect(pizza2.prepare()).toBe('Prepare ClamPizza');
    expect(pizza2.bake()).toBe('Bake ClamPizza');
    expect(pizza2.cut()).toBe('Cut ClamPizza');
    expect(pizza2.box()).toBe('Box ClamPizza');
  });
  test('should create default pizza', () => {
    let store = new PizzaStore();
    let pizza1 = store.orderPizza();
    expect(pizza1 instanceof CheesePizza).toBe(true);
    expect(pizza1 instanceof Pizza).toBe(true);
    expect(pizza1.prepare()).toBe('Prepare CheesePizza');
  });
});
