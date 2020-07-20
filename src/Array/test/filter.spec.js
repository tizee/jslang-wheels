import filter from '../filter';
Array.prototype.filter = filter;
describe('Array filter', () => {
  test('empty array', () => {
    let a = [];
    expect(a.filter(() => true)).toHaveLength(0);
  });
  test('an array', () => {
    let a = [1, 2, 3, 4];
    expect(a.filter((i) => i % 2 == 0)).toHaveLength(2);
  });
});
