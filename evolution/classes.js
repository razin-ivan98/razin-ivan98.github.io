function Evolution() {
    this.orgCount = 0
    this.organisms = {}
    this.orgLast = 0
    this.food = {}
    this.foodLast = 0
    this.foodWatcher = {}
    this.atHomeCount = 0
    this.finished = 0
}
Evolution.prototype.addFood = function (newFood) {
    this.food[this.foodLast] = newFood
    this.foodLast++
}
Evolution.prototype.getHomeCoords = function () {
    const angle = this.atHomeCount / this.orgCount * 2 * Math.PI
    this.atHomeCount++

    return {
        x: radius + radius * Math.sin(angle),
        y: radius + radius * Math.cos(angle),
    }
}
Evolution.prototype.getFoodCoords = function (foodId) {
    return this.food[foodId].coords
}
Evolution.prototype.eatFood = function (id) {

    const value = this.food[id].value
    delete this.food[id]

    if (id in this.foodWatcher)
        for (let key in this.foodWatcher[id]) {

            this.organisms[key].chooseFood()
        }
    return value
}

Evolution.prototype.addOrg = function (newOrg) {
    this.organisms[this.orgLast] = newOrg
    this.organisms[this.orgLast].id = this.orgLast
    this.orgLast++
    this.orgCount++
}
Evolution.prototype.deleteOrg = function (id) {
    delete this.organisms[id]
    this.orgCount--
}
Evolution.prototype.getNearestFoodFor = function (orgId) {
    let orgCoords = this.organisms[orgId].coords
    let nearest = false, nearestDistance = 9999.0, curr
    for (let key in this.food) {
        curr = this.food[key].getDistance(orgCoords)
        if (curr < nearestDistance) {
            nearestDistance = curr
            nearest = key
        }
    }
    if (nearest !== false) {
        if (nearest in this.foodWatcher)
            this.foodWatcher[nearest][orgId] = true
        else {
            this.foodWatcher[nearest] = {}
            this.foodWatcher[nearest][orgId] = true
        }
    }

    return nearest
}

Evolution.prototype.draw = function () {
    for (let key in this.organisms) {
        drawCicle(this.organisms[key].coords.x,
            this.organisms[key].coords.y, 10, `rgb(${255 * this.organisms[key].speed / 3}, 0, ${255 * (3 - this.organisms[key].speed) / 3})`)
    }
    for (let key in this.food) {
        drawCicle(this.food[key].coords.x,
            this.food[key].coords.y, 7, 'yellow')
    }
}

Evolution.prototype.start = function () {
    for (let key in this.organisms) {
        this.organisms[key].coords = this.getHomeCoords()
        this.organisms[key].chooseFood()
    }
    this.atHomeCount = 0
}

Evolution.prototype.newDay = function () {
    this.atHomeCount = 0
    this.finished = 0

    for (let key in this.organisms) {
        if (this.organisms[key].currEnergy < this.organisms[key].energy) {
            this.deleteOrg(key)
        } else if (this.organisms[key].currEnergy > 2 * this.organisms[key].energy) {
            //const babyCount = Math.round(this.organisms[key].currEnergy / this.organisms[key].energy)
            // for (let j = 0; j < babyCount - 1; j++) {
            this.organisms[key].haveBaby()
            //  }

        }
    }

    for (let i = 0; i < foodAmount; i++)
        evolution.addFood(new Food({ x: 100 + Math.random() * 300, y: 100 + Math.random() * 300 }))


    for (let key in this.organisms) {

        this.organisms[key].coords = this.getHomeCoords()
        this.organisms[key].chooseFood()
        this.organisms[key].status = 'running'
        this.organisms[key].currEnergy = 0
    }
}

Evolution.prototype.update = function () {
    let status = false

    if (this.finished === this.orgCount) {
        this.newDay()
    }

    for (let key in this.organisms) {
        if (this.organisms[key].status !== 'finished') {
            status = true
            this.organisms[key].moveToAim()
        }
    }
    return status
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




function Organism(coords) {
    Obj.call(this, coords)

    this.speed = 1.0
    this.energy = 1.0

    this.status = 'running'

    this.currFoodAim = false

    this.currAimCoords = {}

    this.currEnergy = 1.0
}
Organism.prototype = Object.create(Obj.prototype)
Organism.prototype.constructor = Organism

Organism.prototype.updateEnergy = function () {
    //   this.energy = this.speed
}
Organism.prototype.haveBaby = function () {
    const baby = new Organism(this.coords)
    const variety = Math.random()
    if (variety > 1.0 - mutationVariety)
        baby.speed = this.speed + mutationValue < 3 ? this.speed + mutationValue : this.speed
    else if (variety > 1.0 - 2 * mutationValue)
        baby.speed = this.speed > mutationValue ? this.speed - mutationValue : this.speed
    else
        baby.speed = this.speed
    //  baby.updateEnergy()
    evolution.addOrg(baby)
}
Organism.prototype.chooseFood = function () {
    this.currFoodAim = evolution.getNearestFoodFor(this.id)

    if (this.currFoodAim === false) {
        this.toHome()
    } else
        this.currAimCoords = evolution.getFoodCoords(this.currFoodAim)
}
Organism.prototype.moveToAim = function () {

    // console.log(this.getDistance(this.currAimCoords));

    if (this.getDistance(this.currAimCoords) > steps * this.speed) {
        let alpha = Math.atan2(this.currAimCoords.x - this.coords.x, this.currAimCoords.y - this.coords.y)
        //  console.log(alpha);

        this.coords.x += steps * this.speed * Math.sin(alpha)
        this.coords.y += steps * this.speed * Math.cos(alpha)


    } else {
        this.finishAim()
    }
}
Organism.prototype.finishAim = function () {
    if (this.currFoodAim !== false) {
        this.currEnergy += evolution.eatFood(this.currFoodAim)
        this.chooseFood()
    } else {
        this.status = 'finished'
        evolution.finished++
        this.coords = this.currAimCoords
    }
}
Organism.prototype.toHome = function () {
    if (this.status !== 'toHome') {
        this.currFoodAim = false
        this.status = 'toHome'
        this.currAimCoords = evolution.getHomeCoords()
    }
}