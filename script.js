const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = canvas.clientWidth);
const height = (canvas.height = canvas.clientHeight);

let size = 1;
let x1 = 0;
let y1 = 0;
let color = "white";
ctx.translate(width / 2, height / 2);
let points = [];

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
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

function drawVectors(e) {
  ctx.clearRect(-width / 2, -height / 2, width, height);
  drawLine(0, 0, width / 2, 0);
  drawLine(0, 0, 0, height / 2);
  drawLine(0, 0, -width / 2, 0);
  drawLine(0, 0, 0, -height / 2);

  drawPoints(points);

  color = "red";
  let pos = [e.clientX - width / 2, e.clientY - height / 2];
  let di = Math.abs(-pos[1] - pos[0]) / Math.sqrt(2);
  let hip2 = pos[0] * pos[0] + -pos[1] * -pos[1];
  let z = Math.sqrt(hip2/2 - di * di/2);
  color = "red";
  pos[1] > pos[0] ? drawLine(0, 0, -z, z) : drawLine(0, 0, z, -z);
  color = "red";
  drawLine(0, 0, pos[0], 0);
  color = "red";
  drawLine(0, 0, 0, pos[1]);
  color = "red";
  drawLine(0, 0, pos[0], pos[1]);
}

window.addEventListener("mousemove", drawVectors);
