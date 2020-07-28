import { TheaterFacade, CDPlayer, Light } from '../structural/facade';

describe('Facade Pattern', () => {
  test('all in one', () => {
    let player = new CDPlayer();
    let light = new Light();
    let thearter = new TheaterFacade(player, light);
    thearter.play();
    thearter.stop();
  });
});
