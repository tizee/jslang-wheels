import { Player } from '../creational/singleton';

describe('Singleton Pattern', () => {
  test('should have only instance created by new operator', () => {
    let p = new Player();
    let p2 = new Player();
    let p3 = Player.getInstance();
    expect(p2).toStrictEqual(p);
    expect(p2).toStrictEqual(p3);
    expect(p2.getName()).toBe('A player');
  });
});
