
function canvasMouseDown(event) {
    event.preventDefault();
    if (event.which === 1)
        isMoveScale = 1;
    else if (event.which === 2)
        isRot = 1;
    prevX = (event.offsetX === undefined) ? event.layerX : event.offsetX;
    prevY = (event.offsetY === undefined) ? event.layerY : event.offsetY;

}
function canvasMouseUp(event) {
    event.preventDefault();
    isRot = 0;
    isMoveScale = 0;
}
function canvasMouseMove(event) {
    event.preventDefault();
    let x = (event.offsetX === undefined) ? event.layerX : event.offsetX;
    let y = (event.offsetY === undefined) ? event.layerY : event.offsetY;
    let deltaX = x - prevX;
    let deltaY = y - prevY;
    if (isRot === 1) {

        cRe += -0.005 * deltaY / scale;
        cIm += 0.005 * deltaX / scale;
    }
    else if (isMoveScale === 1) {
        delta[0] -= 0.008 * deltaX / scale;
        delta[1] += 0.008 * deltaY / scale;
    }
    prevX = x;
    prevY = y;
}

function canvasMouseWheel(event) {

    scale += scale * event.deltaY * 0.005;
    if (scale < 1)
        scale = 1.0;
}

function canvasTouchStart(event) {
    event.preventDefault();
    //  if (event.changedTouches.length === 1) {
    isRot = 1;
    prevX = event.targetTouches[0].clientX;
    prevY = event.targetTouches[0].clientY;

    if (event.targetTouches.length === 2) {
        prevX2 = event.targetTouches[1].clientX;
        prevY2 = event.targetTouches[1].clientY;
    }
    //  }
    ///else {
    //   isMoveScale = 1;
    // prevX = event.changedTouches[0].clientX;
    //prevY = event.changedTouches[0].clientY;
    // prevX2 = event.changedTouches[1].clientX;
    // prevY2 = event.changedTouches[1].clientY;

    //}


}
function canvasTouchMove(event) {
    event.preventDefault();
    if (event.targetTouches.length > 1) {
        isRot = 0;
        isMoveScale = 1
    }

    if (isRot === 1) {
        let x = event.targetTouches[0].clientX;
        let y = event.targetTouches[0].clientY;
        let deltaX = x - prevX;
        let deltaY = y - prevY;
        cRe += -0.005 * deltaY / scale;
        cIm += 0.005 * deltaX / scale;

        prevX = x;
        prevY = y;
    }
    else if (isMoveScale === 1) {
        let x = event.targetTouches[0].clientX;
        let y = event.targetTouches[0].clientY;
        let deltaX = x - prevX;
        let deltaY = y - prevY;

        let x2 = event.targetTouches[1].clientX;
        let y2 = event.targetTouches[1].clientY;

        delta[0] -= 0.008 * deltaX / scale;
        delta[1] += 0.008 * deltaY / scale;

        scale += 0.005 * scale * (Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2)) -
            Math.sqrt(Math.pow(prevX2 - prevX, 2) + Math.pow(prevY2 - prevY, 2)));
        //   document.getElementById('p').innerHTML += scale + ' ';
        if (scale < 1)
            scale = 1;

        prevX = x;
        prevY = y;

        prevX2 = x2;
        prevY2 = y2;
    }
}
