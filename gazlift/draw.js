function drawHatch() {



    this.ctx.beginPath();
    this.ctx.moveTo(center.x + (hatch.center.x) / 3, center.y - (hatch.center.y) / 3);

    this.ctx.lineTo(center.x + (this.hatch.first.x) / 3, center.y - (hatch.first.y) / 3);
    this.ctx.lineTo(center.x + (this.hatch.second.x) / 3, center.y - (hatch.second.y) / 3);
    this.ctx.lineTo(center.x + (this.hatch.third.x) / 3, center.y - (hatch.third.y) / 3);
    this.ctx.lineTo(center.x + (this.hatch.center.x) / 3, center.y - (hatch.center.y) / 3);


    this.ctx.fillStyle = 'green';
    this.ctx.fill();

    ctx.beginPath();
    ctx.arc(center.x + (hatch.hinge.x) / 3, center.y - (hatch.hinge.y) / 3, 3, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
}

function drawFrameBracing() {
    ctx.beginPath();
    ctx.arc(center.x + (Number(frameBracing.x)) / 3, center.y - (Number(frameBracing.y)) / 3, 3, 0, 2 * Math.PI, false);



    ctx.fillStyle = 'blue';
    ctx.fill();
}

function drawGasLift() {
    ctx.beginPath();
    ctx.moveTo(center.x + (Number(frameBracing.x)) / 3, center.y - (Number(frameBracing.y)) / 3);
    ctx.lineTo(center.x + (hatch.hinge.x) / 3, center.y - (hatch.hinge.y) / 3);


    ctx.strokeStyle = 'brown';
    ctx.stroke();
}

function drawAxise() {


    ctx.beginPath();
    ctx.moveTo(center.x, 0);
    ctx.lineTo(center.x, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, center.y);
    ctx.lineTo(canvas.width, center.y);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function drawHandle() {
    ctx.beginPath();
    ctx.moveTo(center.x + hatch.handle.x / 3, center.y - hatch.handle.y / 3);
    ctx.lineTo(center.x + hatch.dirHandle.x / 3, center.y - hatch.dirHandle.y / 3);
    //   console.log(center.x + hatch.dirHandle.x / 3);
    //   console.log(center.y - hatch.dirHandle.y / 3);


    ctx.strokeStyle = 'red';
    ctx.stroke();
}