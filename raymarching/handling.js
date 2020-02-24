
function canvasMouseDown(event) {
    isRot = 1;
    is_rot = 1
    prevX = (event.offsetX === undefined) ? event.layerX : event.offsetX;
    prevY = (event.offsetY === undefined) ? event.layerY : event.offsetY;

}
function canvasMouseUp() {
    isRot = 0;
}
function canvasMouseMove(event) {
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
    isRot = 1;
    is_rot = 1
    prevX = event.changedTouches[0].clientX;
    prevY = event.changedTouches[0].clientY;

}
function canvasTouchMove(event) {
    if (isRot === 1) {
        let x = event.changedTouches[0].clientX;
        let y = event.changedTouches[0].clientY;
        let deltaX = x - prevX;
        let deltaY = y - prevY;
        alpha = -0.05 * deltaY;
        beta = 0.05 * deltaX;

        prevX = x;
        prevY = y;
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