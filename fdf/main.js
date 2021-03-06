var arr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var width;

var screen_arr = [];
var selected = { x: 0, y: 0 };

var canvas;
var context;

var alpha = -1;
var beta = 0;

var prevX = 0;
var prevY = 0;

var is_rot = 0;

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

function canvasClick(event) {
    let clickX = (event.offsetX === undefined) ? event.layerX : event.offsetX;
    let clickY = (event.offsetY === undefined) ? event.layerY : event.offsetY;

    for (let i = 0; i < screen_arr.length; i++) {
        for (let j = 0; j < screen_arr[0].length; j++) {
            if (clickX + 5 > screen_arr[i][j].x &&
                clickX - 5 < screen_arr[i][j].x &&
                clickY + 5 > screen_arr[i][j].y &&
                clickY - 5 < screen_arr[i][j].y) {
                selected.x = i;
                selected.y = j;
                redraw();
            }
        }
    }

}
function canvasMouseMove(event) {
    if (is_rot == 1) {
        let clickX = (event.offsetX === undefined) ? event.layerX : event.offsetX;
        let clickY = (event.offsetY === undefined) ? event.layerY : event.offsetY;
        let deltaX = clickX - prevX;
        let deltaY = clickY - prevY;
        prevX = clickX;
        prevY = clickY;
        alpha += deltaY * 0.05;
        beta -= deltaX * 0.05;
        recalc();
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
        alpha += deltaY * 0.05;
        beta -= deltaX * 0.05;
        recalc();
        redraw();
    }
}

window.onload = function () {

    width = width = document.body.clientWidth;
    canvas = this.document.querySelector('#canvas');
    if (width < 500) {
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', width);
    }
    else {
        this.width = 500;
    }

    context = canvas.getContext('2d');
    canvas.onclick = this.canvasClick;
    canvas.onmousemove = this.canvasMouseMove;
    this.canvas.onmousedown = this.canvasMouseDown;
    this.canvas.onmouseup = this.canvasMouseUp;
    this.canvas.ontouchstart = this.canvasTouchStart;
    this.canvas.ontouchend = this.canvasMouseUp;
    this.canvas.ontouchmove = this.canvasTouchMove;
    this.recalc();
    this.redraw();
}

function redraw() {
    let first;
    let second;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "Green";
    context.beginPath();
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            first = screen_arr[i][j];
            if (i < arr.length - 1) {
                second = screen_arr[i + 1][j];

                context.moveTo(first.x, first.y);
                context.lineTo(second.x, second.y);
            }
            if (j < arr[0].length - 1) {
                second = screen_arr[i][j + 1];
                context.moveTo(first.x, first.y);
                context.lineTo(second.x, second.y);
            }
        }
    }
    context.stroke();
    printSelected();
}

function printSelected() {
    context.beginPath();
    context.arc(screen_arr[selected.x][selected.y].x, screen_arr[selected.x][selected.y].y, 3, 0, 2 * Math.PI, false);
    context.fillStyle = 'red';
    context.fill();
}

function pointRotateX(x, y, z) {
    let point = {
        x: x,
        y: y * Math.cos(alpha) + z * Math.sin(alpha),
        z: y * (-Math.sin(alpha)) + z * Math.cos(alpha)
    };
    return point;
}
function pointRotateY(x, y, z) {
    let point = {
        x: x * Math.cos(beta) + z * (-Math.sin(beta)),
        y: y,
        z: x * Math.sin(beta) + z * Math.cos(beta)
    };
    return point;
}

function pointProj(x, y, z) {

    x -= arr[0].length / 2;
    y -= arr.length / 2;
    x = x * width / 15;
    y = y * width / 15;
    z = z * width / 15;

    // let point = {
    //     x: (x - y) * Math.sqrt(3) / 2 + 250,
    //     y: -z + (x + y) / 2 + 250
    // };

    let r_p = pointRotateX(x, y, z);
    r_p = pointRotateY(r_p.x, r_p.y, r_p.z);

    //let h = 1000 - (r_p.z / 2 + (r_p.x + r_p.y) * 0.612);

    let point = {
        // x: 1000 / (1000 + h) * (r_p.x - r_p.y) * 0.707 + width / 2,
        // y: 1000 / (1000 + h) * ((r_p.x + r_p.y) * 0.35 - r_p.z * 0.866) + width / 1.5
        x: r_p.x * (1000.0 / (1000 - r_p.z)) + width / 2,
        y: r_p.y * (1000.0 / (1000 - r_p.z)) + width / 2
    }
    return point;
}

function plus() {
    arr[selected.x][selected.y] += 0.5;
    recalc('selected');
    redraw();
}
function minus() {
    arr[selected.x][selected.y] -= 0.5;
    recalc('selected');
    redraw();
}

function recalc(mode) {
    if (mode === 'selected') {
        screen_arr[selected.x][selected.y] = pointProj(selected.y, selected.x, arr[selected.x][selected.y]);
    }
    else {
        let first;
        screen_arr = [];
        for (let i = 0; i < arr.length; i++) {
            let row = [];
            for (let j = 0; j < arr[0].length; j++) {
                first = pointProj(j, i, arr[i][j]);
                row.push(first);
            }
            this.screen_arr.push(row);
        }
    }
}

function rotX(slider) {
    alpha = slider.value * Math.PI;
    recalc();
    redraw();
}
function rotY(slider) {
    beta = slider.value * Math.PI;
    recalc();
    redraw();
}