function changeHatchBracingX(v) {
    let a2 = Number(v) - frameBracing.x;

    let b2 = Math.sqrt(lift.min ** 2 - a2 ** 2) * -1;

    if (!b2) {
        alert("Такое значение параметра невозможно");
        return;
    }

    hatchBracing.x = Number(v);
    frameBracing.y = b2 + hatchBracing.y;
}
function changeHatchBracingY(v) {
    let a = hatchBracing.y - Number(v);

    hatchBracing.y -= a;
    frameBracing.y -= a;
}


function changeFrameBracingX(v) {
    let a = frameBracing.x - Number(v);

    hatchBracing.x -= a;
    frameBracing.x -= a;
}
function changeFrameBracingY(v) {
    b2 = hatchBracing.y - Number(v);

    a2 = Math.sqrt(lift.min ** 2 - b2 ** 2);
    if (!a2) {
        alert("Такое значение параметра невозможно");
        return;
    }
    frameBracing.y = Number(v);
    hatchBracing.x = frameBracing.x + a2;
}


function changeLiftLength(v) {

    if (updateBracing(Number(v) - lift.stroke)) {
        lift.length = Number(v);
        lift.min = lift.length - lift.stroke;
    }
}
function changeLiftStroke(v) {

    if (updateBracing(lift.length - Number(v))) {
        lift.stroke = Number(v);
        lift.min = lift.length - lift.stroke;
    }
}

function updateBracing(min) {
    let a = Math.abs(hatchBracing.y - frameBracing.y);

    let b2 = Math.sqrt(min ** 2 - a ** 2) + frameBracing.x;
    if (!b2) {
        alert("tgggТакое значение параметра невозможно");
        return (false);
    }
    hatchBracing.x = b2;
    return (true);
}


function updateInputsValues() {
    document.getElementById('hatchLength').value = L;
    document.getElementById('hatchHeight').value = h;
    document.getElementById('hatchMass').value = m;
    document.getElementById('hatchBracingX').value = hatchBracing.x;
    document.getElementById('hatchBracingY').value = hatchBracing.y;
    document.getElementById('frameBracingX').value = frameBracing.x;
    document.getElementById('frameBracingY').value = frameBracing.y;
    document.getElementById('liftLength').value = lift.length;
    document.getElementById('liftStroke').value = lift.stroke;
    //  document.getElementById('liftPower').value = lift.power;
    document.getElementById('handlePos').value = handle.pos;
    document.getElementById('handleDir').value = handle.dir / 2 / Math.PI * 360;

}

function rotateHatch(v) {
    let angle = Number(v) * Math.PI;
    let hatchHinge = {
        x: hatchBracing.x * Math.cos(angle) - hatchBracing.y * Math.sin(angle),
        y: hatchBracing.x * Math.sin(angle) + hatchBracing.y * Math.cos(angle)
    };
    let liftCurrLength = Math.sqrt((hatchHinge.x - frameBracing.x) ** 2 + (hatchHinge.y - frameBracing.y) ** 2);


    if (liftCurrLength > lift.length || liftCurrLength < lift.min) {
        return;
    }
    alpha = angle;
}

function normalLength(x1, y1, x2, y2, x, y) {
    let A, B, C;
    A = y1 - y2;
    B = x2 - x1;
    C = x1 * y2 - x2 * y1;

    let distance = Math.abs(A * x + B * y + C) / Math.sqrt(A ** 2 + B ** 2);

    return (distance);
}

function calc() {
    let res = document.getElementById('result');

    let momentMgClose = m * 9.82 * L / 1000 / 2;
    res.innerHTML = "<h4> Момент от силы тяжести в закрытом состоянии = " + momentMgClose.toFixed(2) + "</h4>";
    let shoulderLiftClose = normalLength(frameBracing.x, frameBracing.y, hatchBracing.x, hatchBracing.y, 0, 0);
    res.innerHTML += "<h4> Плечо силы действия поршня в закрытом состоянии = " + shoulderLiftClose.toFixed(2) + "</h4>";
    let N = momentMgClose / (shoulderLiftClose / 1000);
    res.innerHTML += "<h4> НОМИНАЛ СИЛЫ ПОРШНЯ (чтобы подымал крышку с нуля) = " + N.toFixed(2) + "</h4></br>";
    let momentMgCurr = m * 9.82 * L / 1000 * Math.cos(alpha) / 2;
    res.innerHTML += "<h4>  Угол = " + (alpha / 2 / Math.PI * 360).toFixed(2) + "</h4><h4></h4>";
    res.innerHTML += "<h4>  Момент от силы тяжести при текущем угле = " + momentMgCurr.toFixed(2) + "</h4>";
    let shoulderLiftCurr = normalLength(frameBracing.x, frameBracing.y, hatch.hinge.x, hatch.hinge.y, 0, 0);
    res.innerHTML += "<h4> Плечо силы действия поршня при текущем угле = " + shoulderLiftCurr.toFixed(2) + "</h4>";
    let momentLiftCurr = N * shoulderLiftCurr / 1000;
    let momentHand = momentLiftCurr - momentMgCurr;
    res.innerHTML += "<h4>Момент лифта сейчас = " + momentLiftCurr.toFixed(2) + "</h4>";

    let shoulderHandCurr = normalLength(hatch.handle.x, hatch.handle.y, hatch.dirHandle.x, hatch.dirHandle.y, 0, 0);
    res.innerHTML += "<h4> Плечо силы действия руки(закрываем) = " + shoulderHandCurr.toFixed(2) + "</h4>";
    let H = (momentHand / (shoulderHandCurr / 1000));
    res.innerHTML += "<h4> СИЛА РУКИ ПРИ ЗАКРЫТИИ при текущем угле = " + H.toFixed(2) + "</h4>";



    // let momentLiftCurr =

}