import { utils } from "./utils";

export class Sprite {
  constructor(config) {
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };
    
    this.animations = config.animation || {
      "idle-down": [ [0, 0] ],
      "idle-up": [ [0, 2] ],
      "idle-left": [ [0, 3] ],
      "idle-right": [ [0, 1] ],
      "walk-down": [ [1, 0], [0, 0], [3, 0], [0, 0] ],
      "walk-right": [ [1, 1], [0, 1], [3, 1], [0, 1] ],
      "walk-up": [ [1, 2], [0, 2], [3, 2], [0, 2] ],
      "walk-left": [ [1, 3], [0, 3], [3, 3], [0, 3] ],
    }
    this.currentAnimation = config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;
    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;
    
    this.gameObject = config.gameObject;
    
    this.useShadow = true;
    this.shadow = new Image();
    if (this.useShadow) {
      this.shadow.src = "./images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  };

  updateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress--;
      return;
    }

    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame++;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  };

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  draw(context, cameraPlayer) {
    const x = this.gameObject.x - 8 + utils.withGrid(14.5) - cameraPlayer.x;
    const y = this.gameObject.y - 18 + utils.withGrid(8) - cameraPlayer.y;

    this.isShadowLoaded && context.drawImage(this.shadow, x, y);

    const [frameX, frameY] = this.frame;

    this.isLoaded && context.drawImage(
      this.image,
      frameX * 32, frameY * 32,
      32, 32,
      x, y,
      32, 32,
    );

    this.updateAnimationProgress();
  }
}