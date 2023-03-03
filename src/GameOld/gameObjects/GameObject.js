import { Sprite } from "../Sprite";
import { utils } from "../utils";

export class GameObject {
  constructor(config) {
    this.x = utils.withGrid(config.x);
    this.y = utils.withGrid(config.y);
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "./images/characters/people/npc2.png",
    });
    this.hasCollision = false;
  }

  collision(map) {
    this.hasCollision = true;
    map.addWall(this.x, this.y);
  }

  update() {

  }
};
