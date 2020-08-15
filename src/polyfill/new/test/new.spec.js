import { $new } from '../index';

describe('Test new operator', () => {
  test('should have the same behavior', () => {
    function People(name) {
      this.name = name;
    }
    let me = new People('me');
    let him = $new(People, 'him');
    expect(me).toBeInstanceOf(People);
    expect(him).toBeInstanceOf(People);
  });
  test('constructor not a function', () => {
    let a = function () {};
    let me = new a('me');
    let him = $new(a, 'him');
    expect(me).toBeInstanceOf(Object);
    expect(me).toBeInstanceOf(a);
    expect(him).toBeInstanceOf(Object);
    expect(him).toBeInstanceOf(a);
  });
});
