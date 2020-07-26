import {
  SwimPool,
  Bottle,
  AddCommand,
  DescreaseCommand,
  RemoteController,
  MacroCommand,
} from '../behavioral/command';

describe('Command Pattern', () => {
  // client
  test('should execute different commands', () => {
    // receiver
    let bottle = new Bottle();
    let pool = new SwimPool();
    // command
    let cmdon = new AddCommand(bottle);
    let cmdoff = new DescreaseCommand(bottle);
    let cmdon2 = new AddCommand(pool);
    let cmdoff2 = new DescreaseCommand(pool);
    // invoker
    let ctr = new RemoteController();
    ctr.setCommandObj(0, cmdon, cmdoff);
    ctr.setCommandObj(1, cmdon2, cmdoff2);
    ctr.buttonOnPressed(0);
    ctr.buttonOnPressed(1);
    expect(bottle.total()).toBe(10);
    expect(pool.total()).toBe(1);
    ctr.buttonOnPressed(1);
    expect(pool.total()).toBe(2);
  });
  test('should undo command', () => {
    // receiver
    let bottle = new Bottle();
    // command
    let cmdon = new AddCommand(bottle);
    let cmdoff = new DescreaseCommand(bottle);
    // invoker
    let ctr = new RemoteController();
    ctr.setCommandObj(0, cmdon, cmdoff);
    ctr.buttonOnPressed(0);
    expect(bottle.total()).toBe(10);
    ctr.undoPressed(0);
    expect(bottle.total()).toBe(0);
  });
  test('MacroCommand', () => {
    let bottle = new Bottle();
    let pool = new SwimPool();
    let cmdon = new AddCommand(bottle);
    let cmdoff = new DescreaseCommand(bottle);
    let cmdon2 = new AddCommand(pool);
    let cmdoff2 = new DescreaseCommand(pool);
    let ons = [cmdon, cmdon2];
    let offs = [cmdoff, cmdoff2];
    let macroOn = new MacroCommand(ons);
    let macroOff = new MacroCommand(offs);
    let ctr = new RemoteController();
    ctr.setCommandObj(0, macroOn, macroOff);
    expect(bottle.total()).toBe(0);
    expect(pool.total()).toBe(0);
    ctr.buttonOnPressed(0);
    expect(bottle.total()).toBe(10);
    expect(pool.total()).toBe(1);
    ctr.buttonOffPressed(0);
    expect(bottle.total()).toBe(0);
    expect(pool.total()).toBe(0);
    ctr.buttonOffPressed(0);
    expect(bottle.total()).toBe(-10);
    expect(pool.total()).toBe(-1);
    ctr.undoPressed();
    expect(bottle.total()).toBe(0);
    expect(pool.total()).toBe(0);
  });
});
