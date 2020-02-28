

var UpdateCanvas = function () {
    context.putImageData(canvasData, 0, 0);
}

function render() {
    // for (let i = 0; i < this.canvas.height; i++) {
    //     for (let j = 0; j < this.canvas.width; j++) {
    //         this.canvasData.data[(i * this.canvas.width + j) * 4] = 255;
    //         this.canvasData.data[(i * this.canvas.width + j) * 4 + 1] = 0;
    //         this.canvasData.data[(i * this.canvas.width + j) * 4 + 2] = 0;
    //         this.canvasData.data[(i * this.canvas.width + j) * 4 + 3] = 255;
    //     }
    //     // console.log('d');
    // }
    UpdateCanvas();
    //  requestAnimationFrame(render);
}
function comp(a, b) {
    if (a[1] > b[1])
        return 1;
    else if (a[1] < b[1])
        return -1;
    return 0;
}

function putPixel(x, y, r, g, b) {
    this.canvasData.data[((y) * this.canvas.width + x) * 4] = r;
    this.canvasData.data[((y) * this.canvas.width + x) * 4 + 1] = g;
    this.canvasData.data[((y) * this.canvas.width + x) * 4 + 2] = b;
    this.canvasData.data[((y) * this.canvas.width + x) * 4 + 3] = 255;
}

function drawBottomTriangle(tr) {
    //  tr.sort(comp);

    //  console.log(tr);
    let left = Math.min(tr[1][0], tr[0][0]);
    let right = Math.max(tr[1][0], tr[0][0]);

    let h = tr[2][1] - tr[0][1];

    let leftD = (left - tr[2][0]) / h;
    let rightD = (right - tr[2][0]) / h;

    for (let i = 0; i <= h; i++) {
        for (let j = Math.round(tr[2][0] + leftD * (h - i)); j < tr[2][0] + rightD * (h - i); j++) {
            putPixel(j, tr[0][1] + i, 255, 0, 0);
        }
    }
}

function drawTopTriangle(tr) {
    // tr.sort(comp);
    let left = Math.min(tr[1][0], tr[2][0]);
    let right = Math.max(tr[1][0], tr[2][0]);

    let h = tr[1][1] - tr[0][1];

    let leftD = (left - tr[0][0]) / h;
    let rightD = (right - tr[0][0]) / h;

    for (let i = 0; i <= h; i++) {
        for (let j = Math.round(tr[0][0] + leftD * i); j < tr[0][0] + rightD * i; j++) {
            putPixel(j, tr[0][1] + i, 255, 0, 0);
        }
    }
}

function drawTriangle(tr) {
    tr.sort(comp);
    if (tr[0][1] === tr[1][1])
        drawBottomTriangle(tr);
    else if (tr[1][1] === tr[2][1])
        drawTopTriangle(tr);
    else {
        let point = [
            Math.round(tr[0][0] + (tr[2][0] - tr[0][0]) * (tr[1][1] - tr[0][1]) / (tr[2][1] - tr[0][1])),
            tr[1][1]
        ];



        let top = [tr[0], point, tr[1]];
        let bottom = [tr[1], point, tr[2]];

        drawBottomTriangle(bottom);
        drawTopTriangle(top);
    }
}

// window.onload = function () {
//     canvas = document.getElementById('canvas');
//     context = canvas.getContext('2d');
//     this.canvasData = context.getImageData(0, 0, canvas.width, canvas.height);
//     this.drawTriangle(tr1);
//     this.drawTriangle(tr2);
//     this.drawTriangle(tr3);
//     this.render();
// }