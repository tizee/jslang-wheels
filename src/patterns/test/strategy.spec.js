import { WildDuck, DuckLearnFly, FlyWithWings } from '../behavioral/strategy';
describe('', () => {
  test('should delegate', () => {
    let duck = new WildDuck();
    expect(duck.performFly()).toBe('I can fly with wings');
  });
  test('should change behavior', () => {
    let duck = new DuckLearnFly();
    expect(duck.performFly()).toBe("I can't fly");
    duck.setFlyBehavior(new FlyWithWings());
    expect(duck.performFly()).toBe('I can fly with wings');
  });
});
