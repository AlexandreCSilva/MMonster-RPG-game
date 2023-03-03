import { GameObject } from "./GameObject";

export class Person extends GameObject {
  constructor(config) {
    super(config);
    this.movementProgressRemaining = 0;
    this.isPlayer = config.isPlayer || false;
    this.directionUpdate = {
      "up": ["y", -1],
      "down": ["y", 1],
      "left": ["x", -1],
      "right": ["x", 1],
    }
  }

  update(state) {
    if (this.movementProgressRemaining > 0) {
      this.updatePosition();
    } else {

      // O player pode se mover e apertou um botão
      if (this.isPlayer && state.arrow) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow,
        });
      }
    }
   
    this.updateSprite();
  }

  startBehavior(state, behavior) {
    this.direction = behavior.direction;
    
    // Mostra como o personagem deve se comportar
    if (behavior.type === "walk") {
      
      // Para caso ja tiver um objeto no lugar
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        return;
      }

      // Move o player
      state.map.moveWall(this.x, this.y, this.direction);
      this.movementProgressRemaining = 16;
    }
  }

  updatePosition() {
    if (this.movementProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movementProgressRemaining--;
    }
  }

  updateSprite() {
    if (this.movementProgressRemaining > 0) {
      this.sprite.setAnimation("walk-"+this.direction);
      return;
    }

    this.sprite.setAnimation("idle-"+this.direction);
  }
};
