import reduce from '../reduce';
Array.prototype.reduce = reduce;
describe('reduce', () => {
  test('an empty array', () => {
    expect([].reduce(() => 0)).toBe(undefined);
  });
  test('an array', () => {
    expect([1, 2, 3].reduce((prev, cur) => prev + cur, 0)).toBe(6);
  });
});
