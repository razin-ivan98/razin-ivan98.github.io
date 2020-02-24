var gl;
var fragmentShader;
var vertexShader;
var shaderProgram;

var vertexBuffer;

var power = 8.0;
var camera = {
    x: -2.5,
    y: 0.0,
    z: 0.0
}

var radius = 0.8;
var alpha = 0;
var beta = 0;

var minDist = 0.005;
var maxSteps = 50;

var powerLoc;
var cameraLoc;
var radiusLoc;
var minDistLoc;
var maxStepsLoc;

var vertices = [];


var prevX;
var prevY;
var prevX2;
var prevY2;

var isRot = 0;
var isScale = 0;

var autoRot = 0;

var mvMatrix = glMatrix.mat4.create();

function initProgram() {
    shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Не удалось установить шейдеры');
        console.error(gl.getProgramInfoLog(shaderProgram));
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

function setAttrubutes() {
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
}

function initBuffers() {

    for (let i = -250; i < 250; i++) {
        for (let j = -250; j < 250; j++) {
            vertices.push(i / 250);
            vertices.push(j / 250);
        }
    }

    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexBuffer.itemSize = 2;
    gl.vertexAttribPointer(
        shaderProgram.vertexPositionAttribute,
        vertexBuffer.itemSize,
        gl.FLOAT,
        false,
        0, 0);
    powerLoc = gl.getUniformLocation(shaderProgram, 'u_power');
    cameraLoc = gl.getUniformLocation(shaderProgram, 'u_camera');
    radiusLoc = gl.getUniformLocation(shaderProgram, 'u_radius');
    minDistLoc = gl.getUniformLocation(shaderProgram, 'u_minDist');
    maxStepsLoc = gl.getUniformLocation(shaderProgram, 'u_maxSteps');
    shaderProgram.MVMatrix = gl.getUniformLocation(shaderProgram, "u_MVMatrix");

}

function draw() {

    gl.uniform1f(powerLoc, power);

    glMatrix.mat4.rotate(mvMatrix, mvMatrix, beta, [0, 0, 1]);
    glMatrix.mat4.rotate(mvMatrix, mvMatrix, alpha, [0, 1, 0]);
    gl.uniformMatrix4fv(shaderProgram.MVMatrix, false, mvMatrix);

    gl.uniform3fv(cameraLoc, [camera.x, camera.y, camera.z]);
    gl.uniform1f(radiusLoc, radius);
    gl.uniform1f(minDistLoc, minDist);
    gl.uniform1i(maxStepsLoc, maxSteps);
    if (autoRot === 0) {
        alpha = 0;
        beta = 0;
    }
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, vertices.length / 2);
    requestAnimationFrame(draw);
}




window.onload = function () {
    let canvas = document.getElementById('canvas');

    canvas.onmousedown = canvasMouseDown;
    canvas.onmouseup = canvasMouseUp;
    canvas.onmousemove = canvasMouseMove;

    canvas.ontouchstart = this.canvasTouchStart;
    canvas.ontouchmove = this.canvasTouchMove;
    canvas.ontouchend = canvasMouseUp;

    canvas.onmousewheel = this.canvasMouseWheel;

    try {
        gl = canvas.getContext('webgl2') || canvas.getContext('experimental-webgl2');
    }
    catch (e) {

    }

    if (gl) {
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);//////

        initShaders();
        //  initBuffers();
        initProgram();
        gl.useProgram(shaderProgram);
        setAttrubutes();

        initBuffers();

        draw();
    } else {
        alert('К сожалению, Ваш браузер не поддерживает WebGL.');
    }
}


