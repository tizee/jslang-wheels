import {
  NYPizzaStore,
  BJPizzaStore,
  NYCheesePizza,
  NYPizza,
  BJCheesePizza,
  BJPizza,
} from '../creational/factory';

describe('Factory Method Pattern', () => {
  test('should inherit super class', () => {
    let store = new NYPizzaStore();
    let pizza1 = store.orderPizza('cheese');
    expect(pizza1 instanceof NYCheesePizza);
    expect(pizza1.prepare()).toBe('Prepare NYCheesePizza');
    expect(pizza1.bake()).toBe('Bake NYCheesePizza');
    expect(pizza1.cut()).toBe('Cut NYCheesePizza');
    expect(pizza1.box()).toBe('Box NYCheesePizza');
    let pizza2 = store.orderPizza();
    expect(pizza2 instanceof NYPizza);
    expect(pizza2.prepare()).toBe('Prepare NYPizza');
    expect(pizza2.bake()).toBe('Bake NYPizza');
    expect(pizza2.cut()).toBe('Cut NYPizza');
    expect(pizza2.box()).toBe('Box NYPizza');
  });
  test('should inherit super class', () => {
    let store = new BJPizzaStore();
    let pizza1 = store.orderPizza('cheese');
    expect(pizza1 instanceof BJCheesePizza);
    expect(pizza1.prepare()).toBe('Prepare BJCheesePizza');
    expect(pizza1.bake()).toBe('Bake BJCheesePizza');
    expect(pizza1.cut()).toBe('Cut BJCheesePizza');
    expect(pizza1.box()).toBe('Box BJCheesePizza');
    let pizza2 = store.orderPizza();
    expect(pizza2 instanceof BJPizza);
    expect(pizza2.prepare()).toBe('Prepare BJPizza');
    expect(pizza2.bake()).toBe('Bake BJPizza');
    expect(pizza2.cut()).toBe('Cut BJPizza');
    expect(pizza2.box()).toBe('Box BJPizza');
  });
});
