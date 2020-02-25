function mouseDown(e) {
    drag = true;
    old_x = e.pageX;
    old_y = e.pageY;

    e.preventDefault();
    return false;
};

function mouseUp(e) {
    drag = false;
};

function mouseMove(e) {
    if (!drag) return false;
    dX = (e.pageX - old_x) * 2 * Math.PI / canvas.width;
    dY = (e.pageY - old_y) * 2 * Math.PI / canvas.height;
    // THETA += dX;
    // PHI += dY;
    old_x = e.pageX, old_y = e.pageY;

    e.preventDefault();
};

function touchStart(e) {
    drag = true;
    old_x = event.targetTouches[0].clientX;
    old_y = event.targetTouches[0].clientY;

    e.preventDefault();
};

function touchMove(e) {
    if (!drag) return false;
    let x = event.targetTouches[0].clientX;;
    let y = event.targetTouches[0].clientY;
    dX = (x - old_x) * 2 * Math.PI / canvas.width;
    dY = (y - old_y) * 2 * Math.PI / canvas.height;
    // THETA += dX;
    // PHI += dY;
    old_x = x, old_y = y;

    e.preventDefault();
}