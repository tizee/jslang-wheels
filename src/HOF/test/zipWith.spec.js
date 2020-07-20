import zipWith from '../zipWith';

describe('zipWith', () => {
  test('equal length of A and B', () => {
    const res = zipWith((a, b) => a + b)([1, 2])([3, 4]);
    expect(res.join(' ')).toBe('4 6');
  });
  test('A is longer than B', () => {
    const res = zipWith((a, b) => a + b)([1, 2, 3])([1]);
    expect(res.join(' ')).toBe('2');
  });
  test('B is longer than A', () => {
    const res = zipWith((a, b) => a + b)([1])([1, 2, 3]);
    expect(res.join(' ')).toBe('2');
  });
});
