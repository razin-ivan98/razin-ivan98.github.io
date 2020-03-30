let ctx;
let canvas;
let evolution;
const mutationVariety = 0.5
const mutationValue = 0.1
let steps = 2
const radius = 250
const foodAmount = 20

let pause = true

function drawCicle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color
    ctx.fill();
}

function update() {
    let status = true
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //  console.log(evolution.organisms);

    drawCicle(canvas.width / 2, canvas.height / 2, canvas.width / 2, 'green');

    evolution.update()
    evolution.draw()
    if (!pause) window.requestAnimationFrame(update)
}

window.onload = function () {
    canvas = this.document.getElementById('canvas')
    ctx = canvas.getContext('2d')

    canvas.onclick = function () {
        pause = (pause == true ? false : true);
        update()
    }

    evolution = new Evolution()

    this.alert('Привет! Это небольшой симулятор эволюционных процессов. Перед Вами полянка, на которой каждый день\
     вырастает еда. Еще тут живут наши подопытные зверьки. Каждое утро они выходят на поиски пищи. \
     Если за день зверек не скушает ничего, то он умрет. Если же он сумеет скушать две порции еды, то ночью родит еще одного зверька.\
     У наших зверьков всего лишь один наследуемый признак - Скорость. И он подвергается случайным мутациям.\
      Каждый зверек наследует Скорость от родителя, однако, возможно, с небольшими отклонениями. \
      Чем больше скорость у зверька - тем больше красного цвета в его окраске, а чем меньше - тем болше синего. \
      Давайте посмотрим, как Естественный Отбор постепенно "убьет" "медленные" гены в популяции наших зверьков')

    evolution.addOrg(new Organism({ x: 20, y: 20 }))
    evolution.addOrg(new Organism({ x: 20, y: 20 }))
    evolution.addOrg(new Organism({ x: 20, y: 20 }))
    evolution.addOrg(new Organism({ x: 20, y: 20 }))
    evolution.addOrg(new Organism({ x: 20, y: 20 }))

    evolution.addFood(new Food({ x: 50 + this.Math.random() * 400, y: 50 + this.Math.random() * 400 }))
    evolution.addFood(new Food({ x: 50 + this.Math.random() * 400, y: 50 + this.Math.random() * 400 }))

    evolution.addFood(new Food({ x: 50 + this.Math.random() * 400, y: 50 + this.Math.random() * 400 }))

    evolution.addFood(new Food({ x: 50 + this.Math.random() * 400, y: 50 + this.Math.random() * 400 }))

    evolution.addFood(new Food({ x: 50 + this.Math.random() * 400, y: 50 + this.Math.random() * 400 }))

    evolution.addFood(new Food({ x: 50 + this.Math.random() * 400, y: 50 + this.Math.random() * 400 }))


    evolution.addFood(new Food({ x: 50 + this.Math.random() * 400, y: 50 + this.Math.random() * 400 }))





    evolution.start()
    this.update()
}