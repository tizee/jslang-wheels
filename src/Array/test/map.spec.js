import map from '../map';
Array.prototype.map = map;
describe('map', () => {
  test('an empty array', () => {
    expect([].map(() => 1)).toHaveLength(0);
  });
  test('an array', () => {
    expect([1, 2, 3].map((el) => el + 1).join(' ')).toMatch('2 3 4');
  });
});
