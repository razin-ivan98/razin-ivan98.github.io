let ctx;
let countH1;
let countFH1;

let canvas;
let canvasDiagram;

let ctxDiagram;

let evolution;
const mutationVariety = 0.5
const mutationValue = 0.1
let steps = 1
const radius = 250
const foodAmount = 20
const mapWidth = 500
const mapHeight = 500
let lastTime = 0

let widthDiagram = 20
let widthFox = 10
let widthRabbit = 10

let pause = true

function drawCicle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color
    ctx.fill();
}
function drawRect(x, y, w, h, color) {
    ctxDiagram.beginPath();
    ctxDiagram.rect(x, y, w, h);
    ctxDiagram.fillStyle = color
    ctxDiagram.fill();
}

function update() {
    // let status = true



    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxDiagram.clearRect(0, 0, canvasDiagram.width, canvasDiagram.height);

    widthFox = widthDiagram / evolution.foxesCount
    widthRabbit = widthDiagram / evolution.rabbitsCount



    //  console.log(evolution.organisms);

    drawCicle(canvas.width / 2, canvas.height / 2, canvas.width, 'green');
    lastTime = Date.now()
    evolution.update()
    evolution.draw()
    if (!pause) window.requestAnimationFrame(update)
    countH1.innerHTML = evolution.rabbitsCount
    countFH1.innerHTML = evolution.foxesCount

}
function newrabbit() {
    evolution.addRabbit(new Rabbit({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))
}
function newfox() {
    evolution.addFox(new Fox({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))
}
function newfood() {
    evolution.addFood(new Food({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))
}

window.onload = function () {

    widthDiagram = 500 / 4

    canvas = this.document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    canvasDiagram = this.document.getElementById('diagram')
    ctxDiagram = canvasDiagram.getContext('2d')

    countH1 = this.document.getElementById('countRabbits')
    countFH1 = this.document.getElementById('countFoxes')


    canvas.onclick = function () {
        pause = (pause == true ? false : true);
        update()
    }

    evolution = new Evolution()

    // this.alert('Привет! Это небольшой симулятор эволюционных процессов. Перед Вами полянка, на которой каждый день\
    //  вырастает еда. Еще тут живут наши подопытные зверьки. Каждое утро они выходят на поиски пищи. \
    //  Если за день зверек не скушает ничего, то он умрет. Если же он сумеет скушать две порции еды, то ночью родит еще одного зверька.\
    //  У наших зверьков всего лишь один наследуемый признак - Скорость. И он подвергается случайным мутациям.\
    //   Каждый зверек наследует Скорость от родителя, однако, возможно, с небольшими отклонениями. \
    //   Чем больше скорость у зверька - тем больше красного цвета в его окраске, а чем меньше - тем болше синего. \
    //   Давайте посмотрим, как Естественный Отбор постепенно "убьет" "медленные" гены в популяции наших зверьков')

    evolution.addRabbit(new Rabbit({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))
    evolution.addRabbit(new Rabbit({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))
    evolution.addRabbit(new Rabbit({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))
    evolution.addRabbit(new Rabbit({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))
    evolution.addRabbit(new Rabbit({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))
    evolution.addRabbit(new Rabbit({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))
    evolution.addRabbit(new Rabbit({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))
    evolution.addRabbit(new Rabbit({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))
    evolution.addRabbit(new Rabbit({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))




    evolution.addFox(new Fox({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))
    evolution.addFox(new Fox({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))
    evolution.addFox(new Fox({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))
    evolution.addFox(new Fox({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))






    evolution.addFood(new Food({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))
    evolution.addFood(new Food({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))

    evolution.addFood(new Food({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))

    evolution.addFood(new Food({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))

    evolution.addFood(new Food({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))
    evolution.addFood(new Food({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))

    evolution.addFood(new Food({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))
    evolution.addFood(new Food({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))

    evolution.addFood(new Food({ x: this.Math.random() * 500, y: this.Math.random() * 500 }))







    //evolution.start()
    this.update()
}