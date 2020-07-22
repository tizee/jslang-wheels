import { Coffee, MochaDecorator, WhipDecorator } from '../structural/decorator';

describe('Decorator', () => {
  test('should match', () => {
    let aCupOfCoffee = new Coffee();
    let aCupOfMocha = new MochaDecorator(aCupOfCoffee);
    let mochaAddWhip = new WhipDecorator(aCupOfMocha);
    expect(aCupOfCoffee.cost()).toBe(12);
    expect(aCupOfCoffee.getDesc()).toBe('coffee');
    expect(aCupOfMocha.cost()).toBe(17);
    expect(aCupOfMocha.getDesc()).toBe('coffee, mocha');
    expect(mochaAddWhip.cost()).toBe(23);
    expect(mochaAddWhip.getDesc()).toBe('coffee, mocha, whip');
  });
});
