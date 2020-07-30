import { Menu, MenuIterator } from '../behavioral/iterator';

describe('Iterator Pattern', () => {
  test('should print use iterator', () => {
    let menu = new Menu(['apple', 'banana', 'coffee']);
    let it = menu.createIterator();
    expect(it.next()).toBe('apple');
    expect(it.next()).toBe('banana');
    expect(it.next()).toBe('coffee');
    expect(it.next()).toBeUndefined();
  });
});
