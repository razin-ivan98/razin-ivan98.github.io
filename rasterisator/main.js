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

var mode = 0;

class Vertex {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
class Triangle {
    constructor(vertexNums, color) {
        this.vertexNums = vertexNums;
        this.color = color;
    }
}
class Model {
    constructor(vertexes, triangles) {
        this.vertexes = vertexes;
        this.triangles = triangles;
    }
}

var vAf = new Vertex(1, 1, 1),
    vBf = new Vertex(-1, 1, 1),
    vCf = new Vertex(-1, -1, 1),
    vDf = new Vertex(1, -1, 1),

    vAb = new Vertex(1, 1, -1),
    vBb = new Vertex(-1, 1, -1),
    vCb = new Vertex(-1, -1, -1),
    vDb = new Vertex(1, -1, -1)

var tr1 = new Triangle([0, 1, 2], 'red')
var tr2 = new Triangle([0, 2, 3], 'red')
var tr3 = new Triangle([4, 0, 3], 'green')
var tr4 = new Triangle([4, 3, 7], 'green')
var tr5 = new Triangle([5, 4, 7], 'blue')
var tr6 = new Triangle([5, 7, 6], 'blue')
var tr7 = new Triangle([1, 5, 6], 'yellow')
var tr8 = new Triangle([1, 6, 2], 'yellow')
var tr9 = new Triangle([4, 5, 1], 'purple')
var tr10 = new Triangle([4, 1, 0], 'purple')
var tr11 = new Triangle([2, 6, 7], 'cyan')
var tr12 = new Triangle([2, 7, 3], 'cyan')

var vertexes = [vAf, vBf, vCf, vDf, vAb, vBb, vCb, vDb];
var triangles = [tr1, tr2, tr3, tr4, tr5, tr6, tr7, tr8, tr9, tr10, tr11, tr12];

var model = new Model(vertexes, triangles);

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
    console.log('rot');
    let vertex = new Vertex(
        v.x,
        v.y * Math.cos(alpha) + v.z * Math.sin(alpha),
        v.y * (-Math.sin(alpha)) + v.z * Math.cos(alpha)
    )
    return vertex;
}
function pointRotateY(v) {
    let vertex = new Vertex(
        v.x * Math.cos(beta) + v.z * (-Math.sin(beta)),
        v.y,
        v.x * Math.sin(beta) + v.z * Math.cos(beta)
    )
    return vertex;
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





function drawLine(f, s, color) {
    context.beginPath();
    context.strokeStyle = color;
    context.moveTo(f.x, f.y);
    context.lineTo(s.x, s.y);

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
    for (let i = 0; i < model.vertexes.length; i++) {
        model.vertexes[i] = pointRotateX(model.vertexes[i]);
    }
    // vAf = pointRotateX(vAf);
    // vBf = pointRotateX(vBf);
    // vCf = pointRotateX(vCf);
    // vDf = pointRotateX(vDf);

    // /// Четыре "задних" вершины.
    // vAb = pointRotateX(vAb);
    // vBb = pointRotateX(vBb);
    // vCb = pointRotateX(vCb);
    // vDb = pointRotateX(vDb);
}
function rotY() {
    for (let i = 0; i < model.vertexes.length; i++) {
        model.vertexes[i] = pointRotateY(model.vertexes[i]);
    }
    // vBf = pointRotateY(vBf);
    // vAf = pointRotateY(vAf);
    // vCf = pointRotateY(vCf);
    // vDf = pointRotateY(vDf);

    // /// Четыре "задних" вершины.
    // vAb = pointRotateY(vAb);
    // vBb = pointRotateY(vBb);
    // vCb = pointRotateY(vCb);
    // vDb = pointRotateY(vDb);
}

function redraw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (mode == 0) {
        // Передняя грань.


        for (let tr of model.triangles) {
            let f, s, t;
            f = tr.vertexNums[0];

            s = tr.vertexNums[1];
            t = tr.vertexNums[2];
            drawLine(projectVertex(model.vertexes[f]), projectVertex(model.vertexes[s]), tr.color);
            context.stroke();
            drawLine(projectVertex(model.vertexes[s]), projectVertex(model.vertexes[t]), tr.color);
            context.stroke();
            drawLine(projectVertex(model.vertexes[t]), projectVertex(model.vertexes[f]), tr.color);
            context.stroke();
        }

        // drawLine(projectVertex(vAf), projectVertex(vBf), 'BLUE');
        // drawLine(projectVertex(vBf), projectVertex(vCf), 'BLUE');
        // drawLine(projectVertex(vCf), projectVertex(vDf), 'BLUE');
        // drawLine(projectVertex(vDf), projectVertex(vAf), 'BLUE');

        // // Задняя грань.
        // drawLine(projectVertex(vAb), projectVertex(vBb), 'RED');
        // drawLine(projectVertex(vBb), projectVertex(vCb), 'RED');
        // drawLine(projectVertex(vCb), projectVertex(vDb), 'RED');
        // drawLine(projectVertex(vDb), projectVertex(vAb), 'RED');

        // // Рёбра, соединяющие переднюю и заднюю грани.
        // drawLine(projectVertex(vAf), projectVertex(vAb), 'GREEN');
        // drawLine(projectVertex(vBf), projectVertex(vBb), 'GREEN');
        // drawLine(projectVertex(vCf), projectVertex(vCb), 'GREEN');
        // drawLine(projectVertex(vDf), projectVertex(vDb), 'GREEN');
    }
    else {
        // for (let tr of model.triangles) {



        //     let f, s, t;
        //     f = tr.vertexNums[0];
        //     s = tr.vertexNums[1];
        //     t = tr.vertexNums[2];

        //     drawTriangle(projectVertex(model.vertexes[f]),
        //         projectVertex(model.vertexes[s]),
        //         projectVertex(model.vertexes[t]),
        //         tr.color
        //     );
        // }

        let f = [100, 200];
        let s = [500, 500];
        let t = [50, 400];

        // context.beginPath();
        // context.moveTo(f[0], f[1]);
        // context.lineTo(s[0], s[1]);
        // context.lineTo(t[0], t[1]);
        // context.lineTo(f[0], f[1]);
        // context.fill();



    }
}

function drawTriangle(f, s, t, color) {
    context.beginPath();
    context.fillStyle = color;
    context.moveTo(f.x, f.y);
    context.lineTo(s.x, s.y);
    context.lineTo(t.x, t.y);
    context.lineTo(f.x, f.y);
    context.fill();
}