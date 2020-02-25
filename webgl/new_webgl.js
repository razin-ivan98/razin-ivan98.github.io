var gl;
var program;

var vertexShader;
var fragmentShader;

var drag = false;
var old_x, old_y;
var dX = 0, dY = 0;

var colorLoc;
var positionLoc;
var normalLoc;
var u_matrixLoc;

var vertexBuffer;
var colorBuffer
var normalBuffer;
var vertexIndexBuffer;
// var THETA = 0;
// var PHI = 0;

var eye;
var target;
var up;
var vm;
var pvm;
var q;
var newrot;
var model;

function main() {

    var AMORTIZATION = 0.0;



    // canvas.addEventListener('mousedown', mouseDown, false);
    // canvas.addEventListener('mouseup', mouseUp, false);
    // canvas.addEventListener('mouseout', mouseUp, false);
    // canvas.addEventListener('mousemove', mouseMove, false);





    // var multiplier = 1;
    // const width = canvas.clientWidth * multiplier | 0;
    // const height = canvas.clientHeight * multiplier | 0;
    // canvas.width = width;
    // canvas.height = height;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);









}

function radToDeg(r) {
    return r * 180 / Math.PI;
}

function degToRad(d) {
    return d * Math.PI / 180;
}

//////////////////////////////////////////////

// Draw the scene.
function render(time) {
    // var dt = time - time_old;
    // if (!drag) {
    //     dX *= AMORTIZATION;
    //     dY *= AMORTIZATION;
    // }

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0.0);

    var degY = radToDeg(dY);
    var degX = radToDeg(dX);
    glMatrix.quat.fromEuler(q, degY, degX, 0);
    dX = dY = 0;
    glMatrix.mat4.fromQuat(newrot, q);
    glMatrix.mat4.multiply(model, newrot, model);

    var final = glMatrix.mat4.create();
    glMatrix.mat4.multiply(final, pvm, model);

    gl.uniformMatrix4fv(u_matrixLoc, false, final);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);

    //  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);

    //  gl.drawElements(gl.TRIANGLES, indexData.length, gl.UNSIGNED_SHORT, 0);
    gl.drawArrays(gl.TRIANGLES, 0, vertexData.length);

    requestAnimationFrame(render);

}

function initMatrixes() {
    var fovy = degToRad(45);
    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var near = 0.1;
    var far = -10;
    var radius = 40;
    var up = [0, 1, 0];
    var time_old = 0;


    eye = glMatrix.vec3.fromValues(0, 5, radius * 1.5);
    target = glMatrix.vec3.fromValues(0, 0, 0);
    up = glMatrix.vec3.fromValues(0, 1, 0);
    vm = glMatrix.mat4.create();
    pvm = glMatrix.mat4.create();
    q = glMatrix.quat.create();
    newrot = glMatrix.mat4.create();
    model = glMatrix.mat4.create();

    // 1. perspective matrix
    glMatrix.mat4.perspective(pvm, fovy, aspect, near, far);
    // 2. view matrix
    glMatrix.mat4.lookAt(vm, eye, target, up);
    glMatrix.mat4.multiply(pvm, pvm, vm);

}

function initBuffers() {
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(colorData),
        gl.STATIC_DRAW
    );

    // vertexIndexBuffer = gl.createBuffer();
    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
    //gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
    normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);

    //   console.log(normalData);

}

function setAttrubutes() {
    colorLoc = gl.getAttribLocation(program, 'color');
    positionLoc = gl.getAttribLocation(program, 'position');
    normalLoc = gl.getAttribLocation(program, 'normal');
    u_matrixLoc = gl.getUniformLocation(program, 'u_matrix');
    gl.enableVertexAttribArray(colorLoc);
    gl.enableVertexAttribArray(positionLoc);
    gl.enableVertexAttribArray(normalLoc);

}

function initProgram() {
    program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        alert('Не удалось установить шейдеры');
        console.error(gl.getProgramInfoLog(program));
    }
}

function getShader(type, id) {
    let source = document.getElementById(id).innerHTML;

    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('Ошибка компиляции шейдера');
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function initShaders() {
    vertexShader = getShader(gl.VERTEX_SHADER, 'vertexShaderText');
    fragmentShader = getShader(gl.FRAGMENT_SHADER, 'fragmentShaderText');
}

window.onload = function () {
    let canvas = document.getElementById('canvas');

    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;
    canvas.onmousemove = mouseMove;
    canvas.onmouseout = mouseUp;

    canvas.ontouchstart = touchStart;
    canvas.ontouchmove = touchMove;
    canvas.ontouchend = mouseUp;

    canvas.onmousewheel = this.canvasMouseWheel;
    let lol = document.getElementById('obj').innerHTML;
    this.parseObj(lol);
    try {
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    }
    catch (e) { }

    if (gl) {
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);//////

        initShaders();
        initProgram();
        gl.useProgram(program);
        setAttrubutes();

        initBuffers();

        initMatrixes();

        //   draw();m
        main();
        render();
    } else {
        alert('К сожалению, Ваш браузер не поддерживает WebGL.');
    }

}