import { $call } from '../call';

describe('Test call', () => {
  beforeEach(() => {
    Function.prototype.$call = $call;
  });
  test('should have the same behavior', () => {
    function addA(b) {
      return this.A + b;
    }
    let obj = {
      A: 2,
    };
    expect(addA.$call(obj, 1)).toBe(3);
    expect(addA.call(obj, 1)).toBe(3);
  });
});
