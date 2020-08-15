import { $apply } from '../apply';

describe('Test apply', () => {
  beforeEach(() => {
    Function.prototype.$apply = $apply;
  });
  test('should have the same behaviors', () => {
    let a = [1, 2];
    let b = [3, 4];
    let res = Array.prototype.concat.$apply(a, b);
    console.log(res);
    expect(res).toHaveLength(4);
  });
});
