class CDPlayer {
  start() {
    console.log('start playing');
  }
  close() {
    console.log('stop playing');
  }
}

class Light {
  open() {
    console.log('turn on light');
  }
  close() {
    console.log('turn off light');
  }
}

class TheaterFacade {
  cd: CDPlayer;
  light: Light;
  constructor(player: CDPlayer, light: Light) {
    this.light = light;
    this.cd = player;
  }
  play() {
    this.light.close();
    this.cd.start();
  }
  stop() {
    this.light.open();
    this.cd.close();
  }
}

export { TheaterFacade, CDPlayer, Light };
