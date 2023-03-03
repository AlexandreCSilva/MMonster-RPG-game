export function initGame(canvas) {
  const context = canvas.getContext("2d");

  const image = new Image();
  image.src = '../images/maps/StreetLower.png';

  image.onload = () => {
    context.drawImage(image, 0, 0, 32, 32);
  };
  console.log(context);
};
