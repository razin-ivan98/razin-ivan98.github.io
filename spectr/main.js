var canvas;
var context;
var width;

function drawLine(x, y, color) {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + 60);
    context.stroke();
}

function incrementBase(base) {
    if (base < 2)
        return base + 1;
    else
        return 0;
}
function decrementBase(base) {
    if (base > 0)
        return base - 1;
    else
        return 2;
}

function drawSpectr() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < width; i++) {
        drawLine(i, 20, getColor(i / width));
    }
}

function getColor(percent) {
    let c1_3 = 1 / 3;
    let c2_3 = 2 / 3;
    let c1_6 = 1 / 6;
    let rgb = [0, 0, 0];

    let base;
    let phase;
    if (percent < c1_3) {
        base = 0;
    } else if (percent < c2_3) {
        base = 1;
        percent -= c1_3;
    } else {
        base = 2;
        percent -= c2_3;
    }
    phase = (percent < c1_6 ? 0 : 1);
    percent -= c1_6 * phase;
    percent = percent / c1_6;

    rgb[base] = 255;
    if (phase === 1)
        rgb[incrementBase(base)] = Math.round(255 * percent);
    else
        rgb[decrementBase(base)] = Math.round(255 * (1.0 - percent));
    return ('rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')');
}

window.onload = function () {
    canvas = document.getElementById('canvas');

    canvas.onclick = function () {
        let color;
        let percent;
        let x = (event.offsetX === undefined) ? event.layerX : event.offsetX;
        let y = (event.offsetY === undefined) ? event.layerY : event.offsetY;
        if (y > 20 && y < 80) {
            percent = x / width;

            color = getColor(percent);

            context.fillStyle = color;
            context.fillRect(0, 100, width, 60);
        }
    }


    this.context = canvas.getContext('2d');
    width = document.body.clientWidth;
    if (width < 500) {
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', width);
    }
    else {
        this.width = 500;
    }
    drawSpectr();
}