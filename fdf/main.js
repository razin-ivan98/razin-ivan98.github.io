var arr = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

var screen_arr = [];
var selected = { x: 0, y: 0 };

var canvas;
var context;

function clickCanvas(event) {
    let clickX = event.layerX;
    let clickY = event.layerY;

    for (let i = 0; i < screen_arr.length; i++) {
        for (let j = 0; j < screen_arr[0].length; j++) {
            if (clickX + 10 > screen_arr[i][j].x &&
                clickX - 10 < screen_arr[i][j].x &&
                clickY + 10 > screen_arr[i][j].y &&
                clickY - 10 < screen_arr[i][j].y) {
                selected.x = i;
                selected.y = j;
                redraw();
            }
        }
    }
}

window.onload = function () {

    canvas = this.document.querySelector('#canvas');
    context = canvas.getContext('2d');
    canvas.onclick = this.clickCanvas;
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

function point_proj(x, y, z) {

    x -= arr[0].length / 2;
    y -= arr.length / 2;
    x *= 75;
    y *= 75;
    z *= 75;

    // let point = {
    //     x: (x - y) * Math.sqrt(3) / 2 + 250,
    //     y: -z + (x + y) / 2 + 250
    // };

    let h = 1000 - (z / 2 + (x + y) * 0.612);

    let point = {
        x: 1000 / (1000 + h) * (x - y) * 0.707 + 250,
        y: 1000 / (1000 + h) * ((x + y) * 0.35 - z * 0.866) + 250
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
        screen_arr[selected.x][selected.y] = point_proj(selected.y, selected.x, arr[selected.x][selected.y]);
    }
    else {
        let first;
        screen_arr = [];
        for (let i = 0; i < arr.length; i++) {
            let row = [];
            for (let j = 0; j < arr[0].length; j++) {
                first = point_proj(j, i, arr[i][j]);
                row.push(first);
            }
            this.screen_arr.push(row);
        }
    }
}