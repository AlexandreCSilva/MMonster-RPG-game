export class DirectionInput {
  constructor() {
    this.holdDirections = [];
    this.map = {
      "ArrowUp": "up",
      "ArrowDown": "down",
      "ArrowRight": "right",
      "ArrowLeft": "left",
      "KeyW": "up",
      "KeyS": "down",
      "KeyD": "right",
      "KeyA": "left",
    }
  };

  get direction() {
    return this.holdDirections[0];
  }

  init() {
    document.addEventListener("keydown", e => {
      const direction = this.map[e.code];
      if (direction && this.holdDirections.indexOf(direction) === -1) {
        this.holdDirections.unshift(direction);
      }
    });
    document.addEventListener("keyup", e => {
      const direction = this.map[e.code];
      const index = this.holdDirections.indexOf(direction);
      if (index > -1) {
        this.holdDirections.splice(index, 1);
      }
    });
  }
};
