
function canvasMouseWheel(event) {

    radius += event.deltaY * 0.0001;
    if (radius > 1)
        radius = 1;
    if (radius < 0.1)
        radius = 0.1;
}

function canvasMouseDown(event) {
    event.preventDefault();
    isRot = 1;
    prevX = (event.offsetX === undefined) ? event.layerX : event.offsetX;
    prevY = (event.offsetY === undefined) ? event.layerY : event.offsetY;

}
function canvasMouseUp() {
    event.preventDefault();
    isRot = 0;
    isScale = 0;
}
function canvasMouseMove(event) {
    event.preventDefault();
    if (isRot === 1) {
        let x = (event.offsetX === undefined) ? event.layerX : event.offsetX;
        let y = (event.offsetY === undefined) ? event.layerY : event.offsetY;
        let deltaX = x - prevX;
        let deltaY = y - prevY;
        alpha = -0.005 * deltaY;
        beta = 0.005 * deltaX;

        prevX = x;
        prevY = y;
    }

}

function canvasTouchStart(event) {
    event.preventDefault();
    isRot = 1;
    prevX = event.targetTouches[0].clientX;
    prevY = event.targetTouches[0].clientY;
    if (event.targetTouches.length > 1) {
        prevX2 = event.targetTouches[1].clientX;
        prevY2 = event.targetTouches[1].clientY;
    }

}
function canvasTouchMove(event) {
    event.preventDefault();
    if (event.targetTouches.length > 1) {
        isRot = 0;
        isScale = 1;
    }
    else {
        isScale = 0;
        isRot = 1;
    }
    if (isRot === 1) {
        let x = event.changedTouches[0].clientX;
        let y = event.changedTouches[0].clientY;
        let deltaX = x - prevX;
        let deltaY = y - prevY;
        alpha = -0.01 * deltaY;
        beta = 0.01 * deltaX;

        prevX = x;
        prevY = y;
    }
    else if (isScale === 1) {
        let x = event.targetTouches[0].clientX;
        let y = event.targetTouches[0].clientY;

        let x2 = event.targetTouches[1].clientX;
        let y2 = event.targetTouches[1].clientY;

        radius += 0.5(Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2)) -
            Math.sqrt(Math.pow(prevX2 - prevX, 2) + Math.pow(prevY2 - prevY, 2)));
        document.getElementById('p').innerHTML += radius + ' ';

        if (radius > 1)
            radius = 1;
        if (radius < 0.1)
            radius = 0.1;

        prevX = x;
        prevY = y;

        prevX2 = x2;
        prevY2 = y2;
    }
}

function autoRotHandle() {
    let button = document.getElementById('btn');
    if (autoRot === 0) {
        autoRot = 1;
        button.className = 'active';
    }
    else {
        autoRot = 0;
        button.className = '';
    }

}