function init() {
  // width = canvas.width = canvas.clientWidth;
  // height = canvas.height = canvas.clientHeight;
  // ctx.translate(width / 2, height / 2);
  drawLine(0, 0, width / 2, 0);
  drawLine(0, 0, 0, height / 2);
  drawLine(0, 0, -width / 2, 0);
  drawLine(0, 0, 0, -height / 2);

  drawPoints(points);
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

let width = (canvas.width = canvas.clientWidth);
let height = (canvas.height = canvas.clientHeight);
let width2 = (canvas2.width = canvas2.clientWidth);
let height2 = (canvas2.height = canvas2.clientHeight);

let keys = {
  keyL: false,
  keyR: false,
  keyM: false,
};

let pressPos = [0, 0];

let pressed = false;
let x = 0;
let y = 0;
let size = 1;
let x1 = 0;
let y1 = 0;
let color = "white";
ctx.translate(width / 2, height / 2);
ctx2.translate(width / 2, height / 2);
// let points = [];

function drawCircle(x, y, size2, color2) {
  ctx.beginPath();
  ctx.arc(x, y, size2 || size, 0, Math.PI * 2);
  ctx.fillStyle = color2 || color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2, size2, color2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineCap = "round";
  ctx.strokeStyle = color2 || color;
  ctx.lineWidth = (size2 || size) * 2;
  ctx.stroke();
  color = "white";
}

function drawPoints(points) {
  for (let point of points) {
    drawCircle(point[0], -point[1]);
    point[0] !== x1 ? drawLine(x1, y1, point[0], -point[1]) : "";
    x1 = point[0];
    y1 = -point[1];
  }
}

function makePoints(start, end, func, moveX) {
  let points = [];
  for (let x = start; x <= end; x += 1) {
    y = func(x-moveX);
    points.push([x, y]);
  }
  x1 = points[0][0];
  y1 = points[0][1];
  drawPoints(points);
}

function drawSquare(x, y, sWidth, front) {
  let moveX = x
  let oran = 1;
  let x1 = x-sWidth/2
  let x2 = x+sWidth/2
  let ortaX = (x1+x2)/2
  let y1 = y-sWidth/2
  let y2 = y+sWidth/2
  let ortaY = (y1+y2)/2
  makePoints(ortaX, ortaX + sWidth / (oran * 2), (x) => {
    return x + y ;
  }, moveX);
  if (true) {
    makePoints(ortaX - sWidth / (oran * 2), ortaX, (x) => {
      return x + sWidth + y;
    }, moveX);
    makePoints(ortaX, ortaX + sWidth / (oran * 2), (x) => {
      return -x + sWidth + y;
    }, moveX);
  }
  makePoints(ortaX - sWidth / (oran * 2), ortaX, (x) => {
    return -x + y;
  },moveX);
}

function drawCube(x, x2,y, y2, width) {
  let ortaX = (x + x2)/2
  let ortaY = (y + y2)/2
  

  drawSquare(x2, y2, width, false);
  drawSquare(x, y, width, true);
  drawLine(ortaX-width / 2, -y-width/2, ortaX-width / 2, -(y2+width/2));
  drawLine(ortaX+ width / 2,- y-width/2,ortaX+ width / 2, -(y2+width/2));
  // drawLine()
}

function prepare() {
  drawLine(0, 0, width / 2, 0);
  drawLine(0, 0, 0, height / 2);
  drawLine(0, 0, -width / 2, 0);
  drawLine(0, 0, 0, -height / 2);

  drawCube(-150,-150,50, 150, 200);

  // drawPoints(points);
}
prepare();
