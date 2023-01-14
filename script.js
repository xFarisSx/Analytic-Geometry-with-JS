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

let width = (canvas.width = canvas.clientWidth);
let height = (canvas.height = canvas.clientHeight);

let x = 0;
let y = 0;
let size = 1;
let x1 = 0;
let y1 = 0;
let color = "white";
ctx.translate(width / 2, height / 2);
let points = [];

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
  ctx.lineWidth = (size2 || size)*2;
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

function makePoints(start, end) {
  for (let x = start; x <= end; x += 1) {
    y = x;
    points.push([x * 15, y * 15]);
  }
  x1 = points[0][0];
  y1 = points[0][1];
}

function prepare() {
  drawLine(0, 0, width / 2, 0);
  drawLine(0, 0, 0, height / 2);
  drawLine(0, 0, -width / 2, 0);
  drawLine(0, 0, 0, -height / 2);

  makePoints(-width / 2, width / 2);

  drawPoints(points);
}
prepare();

function drawLines(pos) {
  ctx.save();



  ctx.shadowColor = "red";
  ctx.shadowBlur = 15;
  let di = Math.abs(-pos[1] - pos[0]) / Math.sqrt(2);
  let hip2 = pos[0] * pos[0] + -pos[1] * -pos[1];
  let z = Math.sqrt(hip2 / 2 - (di * di) / 2);
  color = "red";
  pos[1] > pos[0] ? drawLine(0, 0, -z, z) : drawLine(0, 0, z, -z);
  color = "red";
  drawLine(0, 0, pos[0], 0);
  color = "red";
  drawLine(0, 0, 0, pos[1]);
  color = "red";
  drawLine(0, 0, pos[0], pos[1]);

  drawCircle(pos[0], pos[1], 10, "white");
  ctx.restore();
}

function drawVectors(e) {
  init();

  color = "red";
  let pos = [e.clientX - width / 2, e.clientY - height / 2];
  drawLine(x, y, pos[0], pos[1], 10, 'white');
  x = pos[0];
  y = pos[1];

  drawLines(pos);
}



window.addEventListener("mousemove", drawVectors);
// window.addEventListener('resize', init)
setInterval(() => {
  ctx.save();
  ctx.shadowColor = "red";
  ctx.shadowBlur = 15;
  ctx.restore();
  drawLines([x, y]);
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.rect(-width / 2, -height / 2, width, height);
  ctx.fill();
}, 10);
