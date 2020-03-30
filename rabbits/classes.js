function Evolution() {
    this.rabbits = {}
    this.rabbitsCount = 0
    this.rabbitsLast = 0

    this.foxes = {}
    this.foxesCount = 0
    this.foxesLast = 0

    this.food = {}
    this.foodCount = 0
    this.foodLast = 0

    this.foodWatcher = {}
}
Evolution.prototype.addRabbit = function (rabbit) {
    this.rabbits['rabbit' + this.rabbitsLast] = rabbit
    this.rabbits['rabbit' + this.rabbitsLast].id = 'rabbit' + this.rabbitsLast
    this.rabbitsLast++
    this.rabbitsCount++
}
Evolution.prototype.killRabbit = function (rabbitId) {
    console.log('kiill');

    delete this.rabbits[rabbitId]
    this.rabbitsCount--
}
Evolution.prototype.killFood = function (foodId) {
    const value = this.food[foodId].value
    delete this.food[foodId]
    this.foodCount--

    if (foodId in this.foodWatcher)
        for (let key in this.foodWatcher[foodId]) {
            if (key in this.rabbits)
                this.rabbits[key].chooseAim()
        }
    return value
}
Evolution.prototype.addFox = function (fox) {
    this.foxes['fox' + this.foxesLast] = fox
    this.foxes['fox' + this.foxesLast].id = 'fox' + this.foxesLast
    this.foxesLast++
    this.foxesCount++
}
Evolution.prototype.addFood = function (food) {
    this.food['food' + this.foodLast] = food
    this.foodLast++
    this.foodCount++
}
Evolution.prototype.getNearestFoodFor = function (orgId) {
    let orgCoords = this.rabbits[orgId].coords
    let nearest = false, nearestDistance = 9999.0, curr
    for (let key in this.food) {
        curr = this.food[key].getDistance(orgCoords)
        if (curr < nearestDistance) {
            nearestDistance = curr
            nearest = key
        }
    }
    if (nearestDistance > this.rabbits[orgId].instinct)
        return false
    if (nearest !== false) {
        if (nearest in this.foodWatcher)
            this.foodWatcher[nearest][orgId] = true
        else {
            this.foodWatcher[nearest] = {}
            this.foodWatcher[nearest][orgId] = true
        }
        return {
            type: 'food',
            id: nearest,
            coords: this.food[nearest].coords
        }
    }
    return false
}
Evolution.prototype.getNearestRabbitFor = function (orgId, orgType, aimType) {
    let orgCoords = this.rabbits[orgId].coords
    let nearest = false, nearestDistance = 9999.0, curr
    for (let key in this.rabbits) {
        if (key === orgId)
            continue;
        curr = this.rabbits[key].getDistance(orgCoords)
        if (curr < nearestDistance) {
            nearestDistance = curr
            nearest = key
        }
    }
    if (nearestDistance > this.rabbits[orgId].instinct)
        return false
    if (nearest !== false) {
        // if (nearest in this.rabbitsWatcher)
        //     this.rabbitsWatcher[nearest][orgId] = true
        // else {
        //     this.rabbitsWatcher[nearest] = {}
        //     this.rabbitsWatcher[nearest][orgId] = true
        // }
        return {
            type: 'reproduction',
            id: nearest,
            coords: this.rabbits[nearest].coords
        }
    }
    return false
}
Evolution.prototype.getRandomAim = function (type) {
    return {
        type: type,
        id: false,
        coords: {
            x: mapWidth * Math.random(),
            y: mapHeight * Math.random(),
        }
    }
}
Evolution.prototype.draw = function () {
    for (let key in this.rabbits) {
        drawCicle(this.rabbits[key].coords.x,
            this.rabbits[key].coords.y, 10, `yellow`)
    }
    for (let key in this.food) {
        drawCicle(this.food[key].coords.x,
            this.food[key].coords.y, 7, 'cyan')
    }
    for (let key in this.foxes) {
        drawCicle(this.foxes[key].coords.x,
            this.foxes[key].coords.y, 15, 'orange')
    }
}
Evolution.prototype.tryHaveBaby = function (id1, id2) {
    if (!(id2 in this.rabbits)) {
        this.rabbits[id1].chooseAim()
        return
    }

    if (this.rabbits[id1].aim.type === 'reproduction' &&
        this.rabbits[id2].aim.type === 'reproduction') {
        let newRabbit = new Rabbit(this.rabbits[id1].coords)
        newRabbit.age = 0.0
        this.addRabbit(newRabbit)
        this.rabbits[id1].libido = 1.0
        this.rabbits[id2].libido = 1.0
    }
    this.rabbits[id1].chooseAim()
    this.rabbits[id2].chooseAim()





}

Evolution.prototype.update = function () {
    if (Math.random() > 0.98)
        this.addFood(new Food({ x: Math.random() * 500, y: Math.random() * 500 }))
    let newTime = Date.now()
    let duration = newTime - lastTime
    lastTime = newTime
    for (let key in this.rabbits) {

        if (this.rabbits[key].aim.type === 'none') {
            let aim = evolution.getNearestFoodFor(key)
            if (aim)
                this.rabbits[key].chooseAim()
        }
        this.rabbits[key].moveToAim(duration)
        if (this.rabbits[key].hunger < 0.0)
            evolution.killRabbit(this.rabbits[key].id)

    }
    for (let key in this.foxes) {

    }
}


function Obj(coords) {
    this.coords = {
        x: coords.x,
        y: coords.y
    }
}
Obj.prototype.getDistance = function (coords) {
    return Math.sqrt((coords.x - this.coords.x) ** 2
        + (coords.y - this.coords.y) ** 2)
}

function Food(coords) {
    Obj.call(this, coords)
    this.value = 1.0
}
Food.prototype = Object.create(Obj.prototype)
Food.prototype.constructor = Food

function Animal(coords) {
    Obj.call(this, coords)
    this.aim = {
        type: 'none',
        id: false,
        coords: {}
    }
    this.sex = 'male'
    this.speed = 1.0
    this.thirst = 1.0
    this.hunger = 1.0
    this.age = 1.0
    this.libido = 1.0
    this.instinct = 50.0
}
Animal.prototype = Object.create(Obj.prototype)
Animal.prototype.constructor = Animal
Animal.prototype.moveToAim = function () {
    if (this.getDistance(this.aim.coords) > steps * this.speed) {
        let alpha = Math.atan2(this.aim.coords.x - this.coords.x, this.aim.coords.y - this.coords.y)

        this.coords.x += steps * this.speed * Math.sin(alpha)
        this.coords.y += steps * this.speed * Math.cos(alpha)

        this.hunger -= 0.001 * steps * this.speed
        this.libido -= 0.001 * steps * this.speed
        //  console.log(this.hunger);


    } else {
        this.finishAim()
    }
}


function Fox(coords) {
    Animal.call(this, coords)
}
Fox.prototype = Object.create(Animal.prototype)
Fox.prototype.constructor = Fox
Fox.prototype.finishAim = function () {
    if (this.aim.type === 'food') {
        this.hunger = 1.0
        evolution.killRabbit(this.aim.id)
        this.chooseAim()
    }
}
Fox.prototype.chooseAim = function () {
    if (this.hunger < this.libido) {
        evolution.getNearestRabbitFor(this.id)
    } else {
        evolution.getNearestFoxFor(this.id)

    }
}

function Rabbit(coords) {
    Animal.call(this, coords)
}
Rabbit.prototype = Object.create(Animal.prototype)
Rabbit.prototype.constructor = Rabbit
Rabbit.prototype.finishAim = function () {
    if (this.aim.type === 'food') {
        this.hunger = 1.0
        evolution.killFood(this.aim.id)
        this.chooseAim()
    } else if (this.aim.type === 'none') {
        this.aim = evolution.getRandomAim('none')
    } else if (this.aim.type === 'reproduction') {
        evolution.tryHaveBaby(this.id, this.aim.id)
    }
}
Rabbit.prototype.chooseAim = function () {
    if (this.hunger <= this.libido || this.hunger < 0.4) {
        this.aim = evolution.getNearestFoodFor(this.id) || evolution.getRandomAim('none')
    } else {
        this.aim = evolution.getNearestRabbitFor(this.id, 'rabbits', 'reproduction') || evolution.getRandomAim('none')
        // console.log(this.aim);

    }
}
