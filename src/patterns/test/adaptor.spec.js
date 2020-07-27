import {
  WildTurkey,
  Turkey,
  Duck,
  MallardDuck,
  TurkeyAdapter,
} from '../structural/adaptor';

describe('Adaptor Pattern', () => {
  test('should like a duck', () => {
    let turkey = new WildTurkey();
    let duck_like_turkey = new TurkeyAdapter(turkey);
    expect(duck_like_turkey.quack()).toBe('pretend to quack');
    expect(duck_like_turkey.fly()).toBe(
      "I'm trying to fly a long distance like a duck"
    );
  });
});
