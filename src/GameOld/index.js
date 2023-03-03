import { LoadMap } from "./LoadMap";

export function initGame(canvas) {
  const map = new LoadMap(canvas);
  map.init();
};
