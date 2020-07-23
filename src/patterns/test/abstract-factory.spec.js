import {
  NYPizzaStore,
  BJPizzaStore,
  FreshClam,
  FrozenClam,
  ThinCrustDough,
  ThickCrustDough,
  ReggianoCheese,
  GoatCheese,
} from '../creational/abstract-factory';

describe('Abstract-Factory Pattern', () => {
  test('should use different ingredients', () => {
    let ny = new NYPizzaStore();
    let bj = new BJPizzaStore();
    let pizza1 = ny.orderPizza('cheese');
    let pizza2 = bj.orderPizza('cheese');
    expect(pizza1.getName()).toBe('NYCheesePizza');
    expect(pizza2.getName()).toBe('BJCheesePizza');
    expect(pizza1.cheese instanceof ReggianoCheese).toBe(true);
    expect(pizza1.dough instanceof ThickCrustDough).toBe(true);
    expect(pizza2.cheese instanceof GoatCheese).toBe(true);
    expect(pizza2.dough instanceof ThinCrustDough).toBe(true);
    let pizza3 = ny.orderPizza('clam');
    let pizza4 = bj.orderPizza('clam');
    expect(pizza3.getName()).toBe('NYClamPizza');
    expect(pizza4.getName()).toBe('BJClamPizza');
    expect(pizza3.clam instanceof FrozenClam).toBe(true);
    expect(pizza3.dough instanceof ThickCrustDough).toBe(true);
    expect(pizza4.clam instanceof FreshClam).toBe(true);
    expect(pizza4.dough instanceof ThinCrustDough).toBe(true);
  });
});
