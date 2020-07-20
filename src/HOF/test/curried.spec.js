import curry from '../curry';
describe('curried function', () => {
  test('not a function', () => {
    const num = 1;
    try {
      expect(curry(num)).toThrowError('not a function');
    } catch (error) {
      expect(error.message).toBe('not a function');
    }
  });

  test('function without parameter', () => {
    const hello = () => {};
    expect(curry(hello)).toBe(hello);
  });
  test('only function', () => {
    const add = (a, b) => {
      return a + b;
    };
    const curry_add = curry(add);
    expect(curry_add !== add).toBe(true);
    expect(curry_add(1, 2)).toBe(3);
    expect(curry_add(1)(2)).toBe(3);
  });
  test('part of parameters', () => {
    const add = (a, b) => {
      return a + b;
    };
    const add1 = curry(add)(1);
    expect(add1 !== add).toBe(true);
    expect(add1(2)).toBe(3);
  });

  test('simple curried sum', () => {
    const sum = (a, b) => a + b;
    const sum1 = curry(sum)(1);
    expect(sum1(3)).toBe(4);
  });
  test('add three times', () => {
    const add3 = (a, b, c) => a + b + c;
    const sum1 = curry(add3)(1);
    expect(sum1).toBeInstanceOf(Function);
    const sum2 = sum1(2);
    expect(sum2).toBeInstanceOf(Function);
    const sum3 = sum2(3);
    expect(sum3).toBe(6);
  });
  test('a curried function', () => {
    const curried = (a) => (b) => a + b;
    const double = curry(curried)(1);
    expect(double(2)).toBe(3);
  });
});
