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

function makePoints(start, end) {
  for (let x = start; x <= end; x += 1) {
    y = (x * x) / 16;
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
  drawLine(x, y, pos[0], pos[1], 10, "white");

  if (keys["keyL"]) {
    console.log("wow");
    ctx2.beginPath();
    ctx2.shadowColor = "red";
    ctx2.shadowBlur = 5;
    ctx2.fillStyle = "white";
    ctx2.arc(pos[0], pos[1], 10, 0, Math.PI * 2);
    ctx2.fill();
    drawLine(x, y, pos[0], pos[1], 10, "white");

    ctx2.beginPath();
    ctx2.moveTo(x, y);
    ctx2.lineTo(pos[0], pos[1]);
    ctx2.lineCap = "round";
    ctx2.strokeStyle = "white";
    ctx2.lineWidth = 10 * 2;
    ctx2.stroke();
    color = "white";
  } else if (keys["keyR"]) {
    clearRoundRect(ctx2, pos[0] - 12.5, pos[1] - 12.5, 25, 25, 15);
  } else if (keys["keyM"]) {
    ctx.save();
    ctx.shadowColor = "red";
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(pressPos[0], pressPos[1]);
    ctx.lineTo(pos[0], pos[1]);
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 10 * 2;
    ctx.stroke();
    ctx.restore();
  }

  x = pos[0];
  y = pos[1];
  drawLines(pos);
}
document.addEventListener(
  "contextmenu",
  (event) => {
    event.preventDefault();
    // keys['keyR'] = false
  },
  false
);

function clearRoundRect(context, x, y, width, height, radius) {
  context.save();
  context.beginPath();
  context.roundRect(x, y, width, height, radius, false, true);
  context.clip();
  context.clearRect(x, y, width, height);
  context.restore();
}

window.addEventListener("mousedown", (e) => {
  pressed = true;
  // e.preventDefault();
  if (e.button == 0) {
    keys["keyL"] = true;
  }
  if (e.button == 2) {
    keys["keyR"] = true;
  }
  if (e.button == 1) {
    keys["keyM"] = true;
    pressPos = [x, y];
  }
});
window.addEventListener("mouseup", (e) => {
  // e.preventDefault();
  pressed = false;
  if (e.button == 0) {
    keys["keyL"] = false;
  }
  if (e.button == 2) {
    keys["keyR"] = false;
  }
  if (e.button == 1) {
    keys["keyM"] = false;
    ctx2.shadowColor = "red";
    ctx2.shadowBlur = 15;
    ctx2.beginPath();
    ctx2.moveTo(pressPos[0], pressPos[1]);
    ctx2.lineTo(x, y);
    ctx2.lineCap = "round";
    ctx2.strokeStyle = "white";
    ctx2.lineWidth = 10 * 2;
    ctx2.stroke();
  }
});
window.addEventListener("mousemove", drawVectors);
// window.addEventListener('resize', init)
setInterval(() => {
  ctx.save();
  ctx.shadowColor = "red";
  ctx.shadowBlur = 15;
  ctx.restore();
  if (keys['keyM']) {
    init()

  }
  drawLines([x, y]);
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.rect(-width / 2, -height / 2, width, height);
  ctx.fill();
}, 10);

window.addEventListener("keypress", (e) => {
  if (e.key == "c") {
    ctx.clearRect(-width / 2, -height / 2, width, height);
    ctx2.clearRect(-width / 2, -height / 2, width, height);
  }
});
