import { GameObject } from "./gameObjects/GameObject";
import { Person } from "./gameObjects/Person";
import { utils } from "./utils";

export class OverWorldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;
    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
    this.walls = config.walls || {};
  }

  drawLowerImage(context, cameraPlayer) {
    context.drawImage(
      this.lowerImage,
      utils.withGrid(14.5) - cameraPlayer.x,
      utils.withGrid(8) - cameraPlayer.y
    );
  };

  drawUpperImage(context, cameraPlayer) {
    context.drawImage(
      this.upperImage,
      utils.withGrid(14.5) - cameraPlayer.x,
      utils.withGrid(8) - cameraPlayer.y
    );
  };

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  };

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  };

  removeWall(wasX, wasY) {
    delete this.walls[`${wasX},${wasY}`];
  };

  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  };

  collisionObjects() {
    Object.values(this.gameObjects).forEach(object => {
      object.collision(this);
    });
  }
};

window.OverWorldMaps = {
  DemoRoom: {
    lowerSrc: "./images/maps/DemoLower.png",
    upperSrc: "./images/maps/DemoUpper.png",
    gameObjects: {
      player: new Person({
        isPlayer: true,
        x: 5,
        y: 6,
      }),
      bald: new GameObject({
        x: 10,
        y: 8,
        src: "./images/characters/people/hero.png",
      }),
    },
    walls: {
      [utils.asGridCoords(1,3)]: true,
      [utils.asGridCoords(2,3)]: true,
      [utils.asGridCoords(3,3)]: true,
      [utils.asGridCoords(4,3)]: true,
      [utils.asGridCoords(5,3)]: true,
      [utils.asGridCoords(9,3)]: true,
      [utils.asGridCoords(10,3)]: true,
      [utils.asGridCoords(11,4)]: true,
      [utils.asGridCoords(11,5)]: true,
      [utils.asGridCoords(11,6)]: true,
      [utils.asGridCoords(11,7)]: true,
      [utils.asGridCoords(11,8)]: true,
      [utils.asGridCoords(11,9)]: true,
      [utils.asGridCoords(0,4)]: true,
      [utils.asGridCoords(0,5)]: true,
      [utils.asGridCoords(0,6)]: true,
      [utils.asGridCoords(0,7)]: true,
      [utils.asGridCoords(0,8)]: true,
      [utils.asGridCoords(0,9)]: true,
      [utils.asGridCoords(1,10)]: true,
      [utils.asGridCoords(2,10)]: true,
      [utils.asGridCoords(3,10)]: true,
      [utils.asGridCoords(4,10)]: true,
      [utils.asGridCoords(6,10)]: true,
      [utils.asGridCoords(7,10)]: true,
      [utils.asGridCoords(8,10)]: true,
      [utils.asGridCoords(9,10)]: true,
      [utils.asGridCoords(10,10)]: true,
      [utils.asGridCoords(6,4)]: true,
      [utils.asGridCoords(8,4)]: true,
      [utils.asGridCoords(7,6)]: true,
      [utils.asGridCoords(8,6)]: true,
      [utils.asGridCoords(7,7)]: true,
      [utils.asGridCoords(8,7)]: true,
    },
  }, 
  Kitchen: {
    lowerSrc: "./images/maps/KitchenLower.png",
    upperSrc: "./images/maps/KitchenUpper.png",
    gameObjects: {
      player: new Person({
        x: 5,
        y: 6,
      }),
      npc: new GameObject({
        x: 10,
        y: 4,
        src: "./images/characters/people/npc1.png",
      }),
    }, 
    walls: {
      [utils.asGridCoords(7,6)]: true,
      [utils.asGridCoords(8,6)]: true,
      [utils.asGridCoords(7,7)]: true,
      [utils.asGridCoords(8,7)]: true,
    },
  },
 
}
