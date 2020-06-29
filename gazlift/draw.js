function drawHatch() {



    this.ctx.beginPath();
    this.ctx.moveTo((center.x + (hatch.center.x) / 3) / 500 * width, (center.y - (hatch.center.y) / 3) / 500 * width);

    this.ctx.lineTo((center.x + (this.hatch.first.x) / 3) / 500 * width, (center.y - (hatch.first.y) / 3) / 500 * width);
    this.ctx.lineTo((center.x + (this.hatch.second.x) / 3) / 500 * width, (center.y - (hatch.second.y) / 3) / 500 * width);
    this.ctx.lineTo((center.x + (this.hatch.third.x) / 3) / 500 * width, (center.y - (hatch.third.y) / 3) / 500 * width);
    this.ctx.lineTo((center.x + (this.hatch.center.x) / 3) / 500 * width, (center.y - (hatch.center.y) / 3) / 500 * width);


    this.ctx.fillStyle = 'green';
    this.ctx.fill();

    ctx.beginPath();
    ctx.arc((center.x + (hatch.hinge.x) / 3) / 500 * width, (center.y - (hatch.hinge.y) / 3) / 500 * width, 3 / 500 * width, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
}

function drawFrameBracing() {
    ctx.beginPath();
    ctx.arc((center.x + (Number(frameBracing.x)) / 3) / 500 * width, (center.y - (Number(frameBracing.y)) / 3) / 500 * width, 3 / 500 * width, 0, 2 * Math.PI, false);



    ctx.fillStyle = 'blue';
    ctx.fill();
}

function drawGasLift() {
    ctx.beginPath();
    ctx.moveTo((center.x + (Number(frameBracing.x)) / 3) / 500 * width, (center.y - (Number(frameBracing.y)) / 3) / 500 * width);
    ctx.lineTo((center.x + (hatch.hinge.x) / 3) / 500 * width, (center.y - (hatch.hinge.y) / 3) / 500 * width);


    ctx.strokeStyle = 'brown';
    ctx.stroke();
}

function drawAxise() {


    ctx.beginPath();
    ctx.moveTo(center.x / 500 * width, 0);
    ctx.lineTo(center.x / 500 * width, canvas.height / 500 * width);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, center.y / 500 * width);
    ctx.lineTo(canvas.width / 500 * width, center.y / 500 * width);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function drawHandle() {
    ctx.beginPath();
    ctx.moveTo((center.x + hatch.handle.x / 3) / 500 * width, (center.y - hatch.handle.y / 3) / 500 * width);
    ctx.lineTo((center.x + hatch.dirHandle.x / 3) / 500 * width, (center.y - hatch.dirHandle.y / 3) / 500 * width);
    //   console.log(center.x + hatch.dirHandle.x / 3);
    //   console.log(center.y - hatch.dirHandle.y / 3);


    ctx.strokeStyle = 'red';
    ctx.stroke();
}