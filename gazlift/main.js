var canvas;
var width;
var ctx;


var L = 960; //0.96;
var h = 45; //0.045;
var m = 36;


var center = { x: 100, y: 350 };

var alpha = 0.0 * Math.PI;

var lift = {
    power: 100,
    length: 584,
    stroke: 180,
    min: 404
};

var hatch = {
    center: { x: 0, y: 0 },
    first: { x: 0, y: 0 },
    second: { x: 0, y: 0 },
    third: { x: 0, y: 0 },
    hinge: { x: 0, y: 0 },
    handle: { x: 0, y: 0 },
    dirHandle: { x: 0, y: 0 }
};

var handle = {
    pos: 600,
    dir: 1.3 * Math.PI
};

var hatchBracing = { x: 200, y: -25 };
var frameBracing = { x: 25, y: -200 };



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

    ctx = canvas.getContext('2d');

    this.update();
}

function init() {
    updateBracing(lift.min);
    updateInputsValues();

    hatch.center = { x: 0, y: 0 };
    hatch.first = { x: hatch.center.x + L, y: hatch.center.y };
    hatch.second = { x: hatch.first.x, y: hatch.first.y + h };
    hatch.third = { x: hatch.center.x, y: hatch.second.y };

    //  hatch.center = center;
    hatch.first = {
        x: hatch.first.x * Math.cos(alpha) - hatch.first.y * Math.sin(alpha),
        y: hatch.first.x * Math.sin(alpha) + hatch.first.y * Math.cos(alpha)
    };
    hatch.second = {
        x: hatch.second.x * Math.cos(alpha) - hatch.second.y * Math.sin(alpha),
        y: hatch.second.x * Math.sin(alpha) + hatch.second.y * Math.cos(alpha)
    };
    hatch.third = {
        x: hatch.third.x * Math.cos(alpha) - hatch.third.y * Math.sin(alpha),
        y: hatch.third.x * Math.sin(alpha) + hatch.third.y * Math.cos(alpha)
    };
    hatch.hinge = {
        x: hatchBracing.x * Math.cos(alpha) - hatchBracing.y * Math.sin(alpha),
        y: hatchBracing.x * Math.sin(alpha) + hatchBracing.y * Math.cos(alpha)
    };
    hatch.handle = {
        x: handle.pos * Math.cos(alpha),
        y: handle.pos * Math.sin(alpha)
    };
    hatch.dirHandle = {
        x: handle.pos + 100 * Math.cos(handle.dir),
        y: 100 * Math.sin(handle.dir)
    };
    hatch.dirHandle = {
        x: hatch.dirHandle.x * Math.cos(alpha) - hatch.dirHandle.y * Math.sin(alpha),
        y: hatch.dirHandle.x * Math.sin(alpha) + hatch.dirHandle.y * Math.cos(alpha)
    }

}

function update() {
    init();
    draw();
    calc();
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxise();
    drawHatch();
    drawFrameBracing();
    drawHandle();
    drawGasLift();
}