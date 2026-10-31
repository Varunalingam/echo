import { Game, Scale, WEBGL } from "phaser";
type GameConfig = Phaser.Types.Core.GameConfig;

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: GameConfig = {
  type: WEBGL,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#028af8",
  scale: {
    mode: Scale.RESIZE,
    autoCenter: Scale.CENTER_BOTH,
  },
  scene: [],
};

export const echo: () => Game = () => new Game(config);
