class Player {
  private static player: Player;
  private desc: string;
  private constructor() {
    if (Player.player) {
      return Player.player;
    }
    Player.player = this;
    Player.player.desc = 'A player';
  }
  static getInstance() {
    Player.player = Player.player || new Player();
    return Player.player;
  }
  getName() {
    return Player.player.desc;
  }
}

export { Player };
