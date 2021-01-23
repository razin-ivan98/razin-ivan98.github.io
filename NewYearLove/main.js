window.addEventListener(
  "orientationchange",
  function () {
    // Announce the new orientation number
    if (window.orientation == 90 || window.orientation == -90) {
      alertElem.innerHTML = "Ура! Можно приступать к игре :)";
      screenOrientation = "landscape";
    } else {
      alertElem.innerHTML =
        "Приложние будет работать только в альбомной ориентации :(";
      screenOrientation = "portrait";

      //stop
      hideCanvas();
      showMenu();
    }
  },
  false
);
window.addEventListener(
  "resize",
  function () {
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
    resize();
  },
  false
);

let width;
let height;

let alertElem;
let canvasElem;
let menuElem;
let ctx;

let timer;

let lag = { alpha: 0.0, pos: { x: 0, y: 100 } };
let santa = { pos: { x: 0, y: -100 }, speed: { x: 0, y: 0 } };

const g = 9.82;

let menuVisible = true;
let screenOrientation;

window.onload = () => {
  canvasElem = document.getElementById("canvas"); //Получение холста из DOM
  menuElem = document.getElementById("menu"); //Получение холста из DOM
  alertElem = document.getElementById("alert"); //Получение холста из DOM

  canvasElem.onclick = () => {
    lag.alpha += Math.PI * 0.05;
  };

  ctx = canvasElem.getContext("2d"); //Получение контекста — через него можно работать с холстом

  width = document.documentElement.clientWidth;
  height = document.documentElement.clientHeight;

  if (window.orientation == 90 || window.orientation == -90) {
    screenOrientation = "landscape";
    alertElem.innerHTML = "Ура! Можно приступать к игре :)";
  } else {
    screenOrientation = "portrait";
    alertElem.innerHTML =
      "Приложние будет работать только в альбомной ориентации :(";
  }

  lag.img = new Image();
  lag.img.onload = function () {
    lag.width = Math.round(0.6 * width);
    lag.height = Math.round((this.height / this.width) * lag.width);
  };
  lag.img.src = "бревно.png";

  santa.img = new Image();
  santa.img.onload = function () {
    santa.width = Math.round(0.2 * width);
    santa.height = Math.round((this.height / this.width) * santa.width);
  };
  santa.img.src = "санта.png";

  resize();
  hideCanvas();
  showMenu();
};

function startClick() {
  if (screenOrientation == "portrait") {
    alert("Приложение будет работать только в альбомной ориентации :(");
    return;
  }
  hideMenu();
  showCanvas();
  start();
}

function start() {
  timer = setInterval(update, 1000 / 30); //Состояние игры будет обновляться 60 раз в секунду — при такой частоте обновление происходящего будет казаться очень плавным
}

function stop() {
  clearInterval(timer); //Остановка обновления
}

function update() {
  //Обновление игры
  draw();
  santa.speed.y += g / 30;

  santa.pos.x += santa.speed.x;
  santa.pos.y += santa.speed.y;
}

function draw() {
  //Работа с графикой
  ctx.clearRect(0, 0, canvasElem.width, canvasElem.height); //Очистка холста от предыдущего кадра
  ctx.translate(width / 2, height / 2);
  drawLog();
  drawSanta();
  ctx.translate(-width / 2, -height / 2);
}

function drawObject(obj) {
  const rect = [
    obj.pos.x + -obj.width / 2,
    obj.pos.y + -obj.height / 2,
    obj.width,
    obj.height,
  ];
  ctx.drawImage(obj.img, ...rect);
}

function drawSanta() {
  drawObject(santa);
}

function drawLog() {
  ctx.translate(lag.pos.x, lag.pos.y);

  ctx.rotate(lag.alpha);
  drawObject(lag);
  ctx.rotate(-lag.alpha);

  ctx.translate(-lag.pos.x, -lag.pos.y);
}

function resize() {
  canvasElem.width = width;
  canvasElem.height = height;
  menuElem.style.height = height + "px";
  menuElem.style.width = width + "px";
}
function hideCanvas() {
  canvasElem.style.display = "none";
}
function hideMenu() {
  menuElem.style.display = "none";
  menuVisible = false;
}
function showMenu() {
  menuElem.style.display = "flex";
  menuVisible = true;
}
function showCanvas() {
  canvasElem.style.display = "block";
}
