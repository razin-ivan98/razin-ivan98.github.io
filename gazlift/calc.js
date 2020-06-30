var wind;

var variants = [];

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
        console.log("Такое значение параметра невозможно");
        return (false);
    }
    frameBracing.y = Number(v);
    hatchBracing.x = frameBracing.x + a2;
    return (true);
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
        console.log("Такое значение параметра невозможно");
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
        return (false);
    }
    alpha = angle;
    return (true);
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

    let percent = (Math.sqrt((hatch.hinge.x - frameBracing.x) ** 2 + (hatch.hinge.y - frameBracing.y) ** 2) - lift.min) / lift.stroke * 100;

    res.innerHTML += "<h4> Степень раскрытости лифта при текущем угле = " + percent.toFixed(2) + "%</h4>";


    // let momentLiftCurr =

}

// var diagram = [];
// var diagramCtx = [];

function calcSheet() {
    var table = document.getElementById('tbody');
    var gazliftSizes = [
        { A: 200, B: 50 },
        { A: 205, B: 50 },
        { A: 254, B: 54 },
        { A: 205, B: 60 },
        { A: 270, B: 80 },
        { A: 330, B: 80 },
        { A: 320, B: 100 },
        { A: 300, B: 100 },
        { A: 395, B: 140 },
        { A: 400, B: 150 },
        { A: 405, B: 105 },
        { A: 445, B: 180 },
        { A: 485, B: 190 },
        { A: 500, B: 200 },
        { A: 522, B: 203 },
        { A: 558, B: 155 },
        { A: 600, B: 250 },
        { A: 634, B: 180 },
        { A: 700, B: 300 }
    ];

    variants = [];


    for (let j = 0; j < gazliftSizes.length; j++) {
        console.log(j);
        // if (j > 2)
        //     break;
        changeFrameBracingY(hatchBracing.y - 1);
        changeLiftStroke(gazliftSizes[j].B);
        changeLiftLength(gazliftSizes[j].A);


        update();

        var delta = (-lift.min + 2) / 5;

        let act = true;
        while (act) {

            update();

            let momentMgClose = m * 9.82 * L / 1000 / 2;
            let shoulderLiftClose = normalLength(frameBracing.x, frameBracing.y, hatchBracing.x, hatchBracing.y, 0, 0);
            let N = momentMgClose / (shoulderLiftClose / 1000);
            //  let momentMgCurr = m * 9.82 * L / 1000 * Math.cos(alpha) / 2;
            //  let shoulderLiftCurr = normalLength(frameBracing.x, frameBracing.y, hatch.hinge.x, hatch.hinge.y, 0, 0);
            //  let momentLiftCurr = N * shoulderLiftCurr / 1000;
            //  let momentHand = momentLiftCurr - momentMgCurr;

            //  let shoulderHandCurr = normalLength(hatch.handle.x, hatch.handle.y, hatch.dirHandle.x, hatch.dirHandle.y, 0, 0);
            //  let H = (momentHand / (shoulderHandCurr / 1000));

            let H = 'сила';


            variants.push({
                liftLength: lift.length,
                liftStroke: lift.stroke,
                liftPower: N,
                hatchX: hatchBracing.x,
                hatchY: hatchBracing.y,
                frameX: frameBracing.x,
                frameY: frameBracing.y,
                maxAngle: null,
                H: H,
                points: []
            });

            for (a = 0; a < 1; a += 1 / 30) {
                if (!rotateHatch(a) || a >= 0.5) {
                    //document.getElementById(`angle${o}`).innerHTML = (a - 1 / 30) * 180;
                    variants[variants.length - 1].maxAngle = (a - 1 / 30) * 180;
                    break;
                }

                update();
                let momentMgCurr = m * 9.82 * L / 1000 * Math.cos(alpha) / 2;
                let shoulderLiftCurr = normalLength(frameBracing.x, frameBracing.y, hatch.hinge.x, hatch.hinge.y, 0, 0);
                let momentLiftCurr = variants[variants.length - 1].liftPower * shoulderLiftCurr / 1000;
                let momentHand = momentLiftCurr - momentMgCurr;

                variants[variants.length - 1].points.push(momentHand);
                //  let shoulderHandCurr = normalLength(hatch.handle.x, hatch.handle.y, hatch.dirHandle.x, hatch.dirHandle.y, 0, 0);
                // let H = (momentHand / (shoulderHandCurr / 1000));
            }
            act = changeFrameBracingY(frameBracing.y + delta);
        }


    }
    table.innerHTML = `<tr>
    <th colspan="3">параметры лифта</th>
    <th colspan="2">Позиция шарнира на крышке</th>
    <th colspan="2">Позиция шарнира на раме</th>
    <th rowspan="2">Максимальный угол</th>
    <th rowspan="2">Сила на закрытие</th>
    <th rowspan="2">В калькулятор</th>
    <th rowspan="2">График</th>


</tr>
<tr>
    <th>Длина</th>
    <th>Ход штока</th>
    <th>Сила</th>
    <th>x</th>
    <th>y</th>
    <th>x</th>
    <th>y</th>
</tr>`;

    for (let t = 0; t < variants.length; t++) {
        table.innerHTML += `
            <tr>
                <td>${variants[t].liftLength.toFixed(2)}</td>
                <td>${variants[t].liftStroke.toFixed(2)}</td>
                <td>${variants[t].liftPower.toFixed(2)}</td>
                <td>${variants[t].hatchX.toFixed(2)}</td>
                <td>${variants[t].hatchY.toFixed(2)}</td>
                <td>${variants[t].frameX.toFixed(2)}</td>
                <td>${variants[t].frameY.toFixed(2)}</td>
                <td id="angle${t}">${variants[t].maxAngle.toFixed(2)}</td>
                <td>${variants[t].H}</td>
                <td><button class="insert" id="${t}" onclick="toCalc(this.id);">Вставить</button></td>
                <td><canvas height='100' width='300' id="diagram${t}">Обновите браузер</canvas></td>
            </tr>`;



    }


    for (let o = 0; o < variants.length; o++) {
        var diagram = document.getElementById('diagram' + o);
        var diagramCtx = diagram.getContext('2d');
        diagramCtx.beginPath();
        diagramCtx.moveTo(0, 50);
        diagramCtx.lineTo(300, 50);
        diagramCtx.strokeStyle = "red";
        diagramCtx.stroke();

        //   var points = [];

        diagramCtx.beginPath();
        diagramCtx.moveTo(0, 50);
        let del = 300 / 15;
        for (let x = 0; x <= 15; x++) {
            diagramCtx.lineTo(x * del, 50 + variants[o].points[x] / -2);

        }
        diagramCtx.strokeStyle = 'blue';
        diagramCtx.stroke();
    }




    wind = document.getElementById('popup');

    wind.className = 'popup-opened';
}

function toCalc(id) {
    console.log(id);
    changeFrameBracingY(hatchBracing.y - 1);
    changeLiftStroke(variants[id].liftStroke);
    changeLiftLength(variants[id].liftLength);

    changeFrameBracingY(variants[id].frameY);

    update();
    wind.className = "popup";
}
