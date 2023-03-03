import { DirectionInput } from "./DirectionInput";
import { OverWorldMap } from "./OverWorldMap";

export class LoadMap {
  constructor(canvas) { 
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.map = null;
  };

  startGamelLoop() {
    const step = () => {
      // Limpa o canvas
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Cria a camera focada no jogador
      const cameraPlayer = this.map.gameObjects.player;
      
      // Atualiza a posição dos objetos
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      });
      
      // Desenha os objetos
      this.map.drawLowerImage(this.context, cameraPlayer);
      Object.values(this.map.gameObjects).forEach(object => {
        object.sprite.draw(this.context, cameraPlayer);
      })
      this.map.drawUpperImage(this.context, cameraPlayer);
      
      // Re-inicia o loop
      requestAnimationFrame(() => {
        step();
      })
    };
    step();
  };

  init() {
    this.map = new OverWorldMap(window.OverWorldMaps.DemoRoom);
    this.map.collisionObjects();
    
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    
    this.startGamelLoop();
  };
};
