var gl;
var shaderProgram;
var vertexBuffer; // буфер вершин
var indexBuffer; //буфер индексов
var colorBuffer; //буфер цветов

var mvMatrix = glMatrix.mat4.create();
var pMatrix = glMatrix.mat4.create();

var is_rot = 0;

var alpha = 0;
var beta = 0;
// установка шейдеров
function initShaders() {
    var fragmentShader = getShader(gl.FRAGMENT_SHADER, 'fragmentShader');
    var vertexShader = getShader(gl.VERTEX_SHADER, 'vertexShader');

    shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Не удалось установить шейдеры");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

    shaderProgram.MVMatrix = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.ProjMatrix = gl.getUniformLocation(shaderProgram, "uPMatrix");
}

function setMatrixUniforms() {
    gl.uniformMatrix4fv(shaderProgram.ProjMatrix, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.MVMatrix, false, mvMatrix);
}
// Функция создания шейдера
function getShader(type, id) {
    var source = document.getElementById(id).innerHTML;

    var shader = gl.createShader(type);

    gl.shaderSource(shader, source);

    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Ошибка компиляции шейдера: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}
// установка буферов вершин и индексов
function initBuffers() {

    var vertices = [
        // лицевая часть
        -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5,
        0.5, 0.5, 0.5,
        0.5, -0.5, 0.5,
        // задняя часть 
        -0.5, -0.5, -0.5,
        -0.5, 0.5, -0.5,
        0.5, 0.5, -0.5,
        0.5, -0.5, -0.5
    ];

    var indices = [ // лицевая часть
        0, 1, 2,
        2, 3, 0,
        //нижняя часть
        0, 4, 7,
        7, 3, 0,
        // левая боковая часть
        0, 1, 5,
        5, 4, 0,
        // правая боковая часть
        2, 3, 7,
        7, 6, 2,
        // верхняя часть
        2, 1, 6,
        6, 5, 1,
        // задняя часть
        4, 5, 6,
        6, 7, 4,
    ];

    // установка буфера вершин
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexBuffer.itemSize = 3;

    // создание буфера индексов
    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    // указываем число индексов это число равно числу индексов
    indexBuffer.numberOfItems = indices.length;

    // установка цветов для каждой вершины
    var сolors = [
        0.0, 0.0, 0.3,
        0.0, 0.0, 1.0,
        0.0, 1.0, 0.0,
        0.0, 0.3, 0.0,

        0.0, 0.0, 0.3,
        0.0, 0.0, 1.0,
        0.0, 1.0, 0.0,
        0.0, 0.3, 0.0
    ];
    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
}

function draw() {

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,
        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.enable(gl.DEPTH_TEST);

    gl.drawElements(gl.TRIANGLES, indexBuffer.numberOfItems, gl.UNSIGNED_SHORT, 0);
}
function setupWebGL() {
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);

    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    glMatrix.mat4.perspective(pMatrix, 1.04, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
    glMatrix.mat4.identity(mvMatrix);
    glMatrix.mat4.translate(mvMatrix, mvMatrix, [0, 0, -2.0]);
    glMatrix.mat4.rotate(mvMatrix, mvMatrix, alpha * 2.0, [0, 1, 0]);
    glMatrix.mat4.rotate(mvMatrix, mvMatrix, beta * 2.0, [1, 0, 0]);
}

window.onload = function () {

    var canvas = document.getElementById("canvas");

    canvas.onmousemove = this.canvasMouseMove;
    canvas.onmousedown = this.canvasMouseDown;
    canvas.onmouseup = this.canvasMouseUp;
    canvas.ontouchstart = this.canvasTouchStart;
    canvas.ontouchend = this.canvasMouseUp;
    canvas.ontouchmove = this.canvasTouchMove;

    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch (e) { }

    if (!gl) {
        alert("Ваш браузер не поддерживает WebGL");
    }
    if (gl) {
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;

        initShaders();
        initBuffers();
        this.refresh();
    }
}




function refresh() {
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);
    setupWebGL();
    setMatrixUniforms();
    draw();

    draw();
}

function canvasMouseDown(event) {
    is_rot = 1
    let clickX = (event.offsetX === undefined) ? event.layerX : event.offsetX;
    let clickY = (event.offsetY === undefined) ? event.layerY : event.offsetY;
    prevX = clickX;
    prevY = clickY;
}
function canvasTouchStart(event) {
    is_rot = 1
    let clickX = event.changedTouches[0].clientX;
    let clickY = event.changedTouches[0].clientY;
    prevX = clickX;
    prevY = clickY;
}
function canvasMouseUp() {
    is_rot = 0;
}

function canvasMouseMove(event) {
    if (is_rot == 1) {
        let clickX = (event.offsetX === undefined) ? event.layerX : event.offsetX;
        let clickY = (event.offsetY === undefined) ? event.layerY : event.offsetY;
        let deltaX = clickX - prevX;
        let deltaY = clickY - prevY;
        prevX = clickX;
        prevY = clickY;
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            beta += deltaY * 0.01;
            console.log(alpha);
        }
        else {
            alpha += deltaX * 0.01;
        }
        refresh();
    }
}
function canvasTouchMove(event) {
    if (is_rot == 1) {
        let clickX = event.changedTouches[0].clientX;
        let clickY = event.changedTouches[0].clientY;
        let deltaX = clickX - prevX;
        let deltaY = clickY - prevY;
        prevX = clickX;
        prevY = clickY;
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            alpha += deltaY;
        }
        else {
            beta += -deltaX * 0;
        }
        refresh();
    }
}