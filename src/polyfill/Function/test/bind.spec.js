import { $bind } from '../bind';

describe('Test bind', () => {
  beforeEach(() => {
    Function.prototype.$bind = $bind;
  });
  test('the same behavior', () => {
    // simple test
    let obj1 = {
      d: 2,
    };
    window.d = 3;
    window.val = 'what';

    function add(a, b) {
      this.val = 'test';
      // would throw an error if called directly
      return a + b + this.d;
    }

    let add2 = add.$bind(obj1);
    let add3 = new add2(1, 2);
    expect(add2(1, 2)).toBe(5);
    expect(add3.val).toBe('test');
    let add4 = add.bind(obj1);
    let add5 = new add4(1, 2);
    expect(add4(1, 2)).toBe(5);
    expect(add5.val).toBe('test');
    let add6 = add.$bind(window);
    let add7 = new add6();
    expect(add6(1, 2)).toBe(6);
    expect(add7.val).toBe('test');
    expect(window.val).toBe('test');
  });
});
