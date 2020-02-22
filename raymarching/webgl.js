var gl;
var fragmentShader;
var vertexShader;
var shaderProgram;

var vertexBuffer;

var power = 8.0;
var powerLoc;
var vertices = [];

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
}

function draw() {

    gl.uniform1f(powerLoc, power);

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, vertices.length / 2);
    requestAnimationFrame(draw);
}

window.onload = function () {
    let canvas = document.getElementById('canvas');

    try {
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    }
    catch (e) {
        alert('Ваш браузер не поддерживает WebGL. Сори бря');
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
    }
}