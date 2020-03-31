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
    console.log('kiilRabbit');
    if (!(rabbitId in this.rabbits))
        return

    delete this.rabbits[rabbitId]
    this.rabbitsCount--
}
Evolution.prototype.killFox = function (foxId) {
    console.log('kiilFox');

    delete this.foxes[foxId]
    this.foxesCount--
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
    if (!(orgId in this.rabbits))
        return false
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
    let orgCoords = this[orgType][orgId].coords
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
    if (nearestDistance > this[orgType][orgId].instinct)
        return false
    if (nearest !== false) {
        // if (nearest in this.rabbitsWatcher)
        //     this.rabbitsWatcher[nearest][orgId] = true
        // else {
        //     this.rabbitsWatcher[nearest] = {}
        //     this.rabbitsWatcher[nearest][orgId] = true
        // }
        return {
            type: aimType,
            id: nearest,
            coords: this.rabbits[nearest].coords
        }
    }
    return false
}
Evolution.prototype.getNearestFoxFor = function (orgId, orgType, aimType) {
    let orgCoords = this[orgType][orgId].coords
    let nearest = false, nearestDistance = 9999.0, curr
    for (let key in this.foxes) {
        if (key === orgId)
            continue;
        curr = this.foxes[key].getDistance(orgCoords)
        if (curr < nearestDistance) {
            nearestDistance = curr
            nearest = key
        }
    }
    if (nearestDistance > this[orgType][orgId].instinct)
        return false
    if (nearest !== false) {
        // if (nearest in this.rabbitsWatcher)
        //     this.rabbitsWatcher[nearest][orgId] = true
        // else {
        //     this.rabbitsWatcher[nearest] = {}
        //     this.rabbitsWatcher[nearest][orgId] = true
        // }
        return {
            type: aimType,
            id: nearest,
            coords: this.foxes[nearest].coords
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
    let i = 0
    for (let key in this.rabbits) {
        drawCicle(this.rabbits[key].coords.x,
            this.rabbits[key].coords.y, 10, `yellow`)
        drawRect(i * widthRabbit, 150, widthRabbit, -this.rabbits[key].speed * 50, 'blue')
        drawRect(widthDiagram + i * widthRabbit, 150, widthRabbit, -this.rabbits[key].instinct, 'red')
        i++
    }
    i = 0
    for (let key in this.food) {
        drawCicle(this.food[key].coords.x,
            this.food[key].coords.y, 7, 'cyan')
    }
    for (let key in this.foxes) {
        drawCicle(this.foxes[key].coords.x,
            this.foxes[key].coords.y, 15, 'orange')
        drawRect(widthDiagram * 2 + i * widthFox, 150, widthFox, -this.foxes[key].speed * 50, 'blue')
        drawRect(widthDiagram * 3 + i * widthFox, 150, widthFox, -this.foxes[key].instinct, 'red')
        i++
    }
    drawRect(0, 150, widthDiagram * 4, -50, 'rgba(255,255,0,0.2)')
}
Evolution.prototype.mutate = function (prop) {
    let variety = Math.random()
    let newP = prop;
    if (variety > 1 - mutationVariety)
        newP += mutationValue * newP
    else if (variety > 1 - 2 * mutationVariety)
        newP -= mutationValue * newP
    if (newP > 0)
        return newP
    return prop
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
        newRabbit.speed = (this.rabbits[id1].speed + this.rabbits[id2].speed) / 2
        newRabbit.speed = this.mutate(newRabbit.speed)

        newRabbit.instinct = (this.rabbits[id1].instinct + this.rabbits[id2].instinct) / 2
        newRabbit.instinct = this.mutate(newRabbit.instinct)

        this.addRabbit(newRabbit)
        this.rabbits[id1].libido = 1.0
        this.rabbits[id2].libido = 1.0
    }
    this.rabbits[id1].chooseAim()
    this.rabbits[id2].chooseAim()
}
Evolution.prototype.tryHaveFoxBaby = function (id1, id2) {
    if (!(id2 in this.foxes)) {
        this.foxes[id1].chooseAim()
        return
    }

    if (this.foxes[id1].aim.type === 'reproduction' &&
        this.foxes[id2].aim.type === 'reproduction') {
        let newFox = new Rabbit(this.foxes[id1].coords)
        newFox.speed = (this.foxes[id1].speed + this.foxes[id2].speed) / 2
        newFox.speed = this.mutate(newFox.speed)

        newFox.instinct = (this.foxes[id1].instinct + this.foxes[id2].instinct) / 2
        newFox.instinct = this.mutate(newFox.instinct)
        newFox.age = 0.0
        this.addFox(newFox)
        this.foxes[id1].libido = 1.0
        this.foxes[id2].libido = 1.0
    }
    this.foxes[id1].chooseAim()
    this.foxes[id2].chooseAim()
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
        if (this.foxes[key].aim.type === 'none') {
            let aim = evolution.getNearestRabbitFor(key, 'foxes', 'food')
            if (aim)
                this.foxes[key].chooseAim()
        }
        this.foxes[key].moveToAim(duration)
        if (this.foxes[key].hunger < 0.0)
            evolution.killFox(this.foxes[key].id)
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
    } else if (this.aim.type === 'none') {
        this.aim = evolution.getRandomAim('none')
    } else if (this.aim.type === 'reproduction') {
        evolution.tryHaveFoxBaby(this.id, this.aim.id)
    }
}
Fox.prototype.chooseAim = function () {
    if (this.hunger <= this.libido || this.hunger < 0.4) {
        this.aim = evolution.getNearestRabbitFor(this.id, 'foxes', 'food') || evolution.getRandomAim('none')
    } else {
        this.aim = evolution.getNearestFoxFor(this.id, 'foxes', 'reproduction') || evolution.getRandomAim('none')
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
