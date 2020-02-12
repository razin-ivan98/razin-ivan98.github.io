var canvas;
var context;

var d = 10,
    Cw = 100,
    Ch = 100,
    Vw = 1,
    Vh = 1;

var is_rot = 0;
var prevX = 0;
var prevY = 0;

var alpha = 0;
var beta = 0;

var width;



function canvasMouseDown(event) {
    is_rot = 1
    let clickX = (event.offsetX === undefined) ? event.layerX : event.offsetX;
    let clickY = (event.offsetY === undefined) ? event.layerY : event.offsetY;
    prevX = clickX;
    prevY = clickY;
}
function canvasTouchStart(event) {
    is_rot = 1
    let clickX = event.changedTouches[0].clientX;
    let clickY = event.changedTouches[0].clientY;
    prevX = clickX;
    prevY = clickY;
}
function canvasMouseUp() {
    is_rot = 0;
}

function canvasMouseMove(event) {
    if (is_rot == 1) {
        let clickX = (event.offsetX === undefined) ? event.layerX : event.offsetX;
        let clickY = (event.offsetY === undefined) ? event.layerY : event.offsetY;
        let deltaX = clickX - prevX;
        let deltaY = clickY - prevY;
        prevX = clickX;
        prevY = clickY;
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            alpha = deltaY * 0.05;
            rotX();
        }
        else {
            beta = -deltaX * 0.05;
            rotY();
        }
        redraw();
    }
}
function canvasTouchMove(event) {
    if (is_rot == 1) {
        let clickX = event.changedTouches[0].clientX;
        let clickY = event.changedTouches[0].clientY;
        let deltaX = clickX - prevX;
        let deltaY = clickY - prevY;
        prevX = clickX;
        prevY = clickY;
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            alpha = deltaY * 0.05;
            rotX();
        }
        else {
            beta = -deltaX * 0.05;
            rotY();
        }
        redraw();
    }
}


function pointRotateX(v) {
    return {
        x: v.x,
        y: v.y * Math.cos(alpha) + v.z * Math.sin(alpha),
        z: v.y * (-Math.sin(alpha)) + v.z * Math.cos(alpha)
    };
}
function pointRotateY(v) {
    return {
        x: v.x * Math.cos(beta) + v.z * (-Math.sin(beta)),
        y: v.y,
        z: v.x * Math.sin(beta) + v.z * Math.cos(beta)
    };
}






function viewportToCanvas(x, y) {
    //console.log('convert', x, y);
    return ({ x: x * Cw / Vw + width / 2, y: y * Ch / Vh + width / 2 });
}

function projectVertex(v) {
    return viewportToCanvas(v.x * (d / (d - v.z)),
        v.y * (d / (d - v.z)))
}
// Четыре "передних" вершины.
var vAf = { x: -1, y: 1, z: -1 },
    vBf = { x: 1, y: 1, z: -1 },
    vCf = { x: 1, y: -1, z: -1 },
    vDf = { x: -1, y: -1, z: -1 },

    /// Четыре "задних" вершины.
    vAb = { x: -1, y: 1, z: 1 },
    vBb = { x: 1, y: 1, z: 1 },
    vCb = { x: 1, y: -1, z: 1 },
    vDb = { x: -1, y: -1, z: 1 }


function drawLine(f, s, color) {
    context.beginPath();
    context.strokeStyle = color;
    context.moveTo(f.x, f.y);
    context.lineTo(s.x, s.y);
    context.stroke();
}


window.onload = function () {
    canvas = this.document.querySelector('#canvas');
    context = canvas.getContext('2d');

    width = document.body.clientWidth;
    if (width < 500) {
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', width);
    }
    else {
        this.width = 500;
    }

    canvas.onmousemove = this.canvasMouseMove;
    this.canvas.onmousedown = this.canvasMouseDown;
    this.canvas.onmouseup = this.canvasMouseUp;
    this.canvas.ontouchstart = this.canvasTouchStart;
    this.canvas.ontouchend = this.canvasMouseUp;
    this.canvas.ontouchmove = this.canvasTouchMove;

    this.redraw();
}

function rotX() {
    vAf = pointRotateX(vAf);
    vBf = pointRotateX(vBf);
    vCf = pointRotateX(vCf);
    vDf = pointRotateX(vDf);

    /// Четыре "задних" вершины.
    vAb = pointRotateX(vAb);
    vBb = pointRotateX(vBb);
    vCb = pointRotateX(vCb);
    vDb = pointRotateX(vDb);
}
function rotY() {
    vBf = pointRotateY(vBf);
    vAf = pointRotateY(vAf);
    vCf = pointRotateY(vCf);
    vDf = pointRotateY(vDf);

    /// Четыре "задних" вершины.
    vAb = pointRotateY(vAb);
    vBb = pointRotateY(vBb);
    vCb = pointRotateY(vCb);
    vDb = pointRotateY(vDb);
}

function redraw() {
    // Передняя грань.
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawLine(projectVertex(vAf), projectVertex(vBf), 'BLUE');
    drawLine(projectVertex(vBf), projectVertex(vCf), 'BLUE');
    drawLine(projectVertex(vCf), projectVertex(vDf), 'BLUE');
    drawLine(projectVertex(vDf), projectVertex(vAf), 'BLUE');

    // Задняя грань.
    drawLine(projectVertex(vAb), projectVertex(vBb), 'RED');
    drawLine(projectVertex(vBb), projectVertex(vCb), 'RED');
    drawLine(projectVertex(vCb), projectVertex(vDb), 'RED');
    drawLine(projectVertex(vDb), projectVertex(vAb), 'RED');

    // Рёбра, соединяющие переднюю и заднюю грани.
    drawLine(projectVertex(vAf), projectVertex(vAb), 'GREEN');
    drawLine(projectVertex(vBf), projectVertex(vBb), 'GREEN');
    drawLine(projectVertex(vCf), projectVertex(vCb), 'GREEN');
    drawLine(projectVertex(vDf), projectVertex(vDb), 'GREEN');
}