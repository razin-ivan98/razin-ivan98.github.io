var canvas;
var context;
var width;

var center_x;
var center_y;
var radius;

var selectedRgb;

function drawLine(x, y, color) {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y + width / 10);
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
        drawLine(i, width / 20, toCssRgb(getColor(i / width)));
    }
}

function toCssRgb(color) {
    return ('rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')');
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
    return (rgb);
}

function drawCircle() {

    let angle;
    let percent;

    let deltaX;
    let deltaY;
    for (let x = center_x - radius; x < center_x + radius; x++) {
        for (let y = center_y - radius; y < center_y + radius; y++) {
            deltaX = x - center_x;
            deltaY = y - center_y;

            if (Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) < radius) {
                angle = Math.atan2(deltaX, deltaY) + Math.PI;
                percent = angle / 2 / Math.PI;

                context.fillStyle = toCssRgb(getColor(percent));
                context.fillRect(x, y, 1, 1);
            }
        }
    }
}

function toStr16(n) {
    let str = Number(n).toString(16);
    if (str.length < 2)
        str = '0' + str;
    return str;
}

window.onload = function () {
    canvas = document.getElementById('canvas');
    var title1 = document.getElementById('rgb');
    var title2 = document.getElementById('html-code');
    canvas.onclick = function () {
        let percent;
        let x = (event.offsetX === undefined) ? event.layerX : event.offsetX;
        let y = (event.offsetY === undefined) ? event.layerY : event.offsetY;
        let deltaX = x - center_x;
        let deltaY = y - center_y;
        if (y > 20 && y < 80) {
            percent = x / width;
            selectedRgb = getColor(percent);

        }
        else if (Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) < radius) {
            let angle = Math.atan2(deltaX, deltaY) + Math.PI;
            percent = angle / 2 / Math.PI;
            selectedRgb = getColor(percent);
        }

        context.fillStyle = toCssRgb(selectedRgb);
        context.fillRect(0, width / 20 * 17, width, width / 10);

        title1.innerHTML = `RGB: R=${selectedRgb[0]} G=${selectedRgb[1]} B=${selectedRgb[2]}`
        title2.innerHTML = `HEX: #${toStr16(selectedRgb[0])}${toStr16(selectedRgb[1])}${toStr16(selectedRgb[2])}`;
    }

    context = canvas.getContext('2d');
    width = document.body.clientWidth;
    if (width < 500) {
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', width);
    }
    else {
        this.width = 500;
    }
    center_x = width / 2;
    center_y = width / 2;
    radius = this.width / 4;

    drawSpectr();
    drawCircle();
}