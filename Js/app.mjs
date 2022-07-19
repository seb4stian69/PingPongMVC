
// Importamos las variables de "entorno"
import { width as wdth, height as hgth, canvas, ctx } from "./env.mjs"

// Objeto canvas
canvas.width = wdth
canvas.height = hgth

/*Elementos globales*/
let width = wdth
let height = hgth
let player = new HumanPlayer() // Jugador
let computer = new ComputerPlayer() // CPU
let ball = new Ball((width / 2) + 10, height / 2) // Ball
let inputArrowsPlayer = {}
let pointsPayer = 0
let pointsCPU = 0

/*Global - Views*/

let viewsElements = function () {

    // Se limpia el elemento mostrandolo desde 0 
    ctx.clearRect(0, 0, width, height)
    // Se limpia el elemento [Bars] player
    player.viewsElements()
    // Se limpia el elemento [Bars] cpu
    computer.viewsElements()
    // Se limpia el elemento [Ball]
    ball.viewsElements()
    // Mostrar puntajes
    seePoints(`P1: ${pointsPayer}`,420, height/2)
    seePoints(`CPU: ${pointsCPU}`, 280, height/2)

}

let fillData = function () {

    // Se rellena la barra del user
    player.fillData()
    // Se crea la barra de la cpu
    computer.fillData(ball)
    // Se genera la pelota
    ball.fillData(player.bars, computer.bars)

}

function seePoints(txt,x,y) {

    ctx.fillStyle = "#111"
    ctx.font = "2em segoe UI"
    ctx.fillText(txt, x, y)

}

/* Instancia y creacion de elementos */

function HumanPlayer() {
    this.bars = new Bars(width / 2 - 30, height - 20, 80, 20)
}

function ComputerPlayer() {
    this.bars = new Bars(width / 2 - 30, 0, 80, 20)
}

HumanPlayer.prototype.viewsElements = function () {
    this.bars.viewsElements()
}

ComputerPlayer.prototype.viewsElements = function () {
    this.bars.viewsElements()
}

function Ball(x, y) {

    this.x = x
    this.y = y
    this.horizontalSpeed = 0
    this.verticalSpeed = 3
    this.radius = 6

}

Ball.prototype.viewsElements = function () {

    ctx.beginPath()
    ctx.fillStyle = "#111"
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()

}

function Bars(x, y, width, height) {

    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.horizontalSpeed = 0
    this.verticalSpeed = 0

}

Bars.prototype.viewsElements = function () {

    ctx.beginPath()
    ctx.fillStyle = "#111"
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.closePath()

}

/*Controladores*/

document.addEventListener('keydown', function (event) {

    inputArrowsPlayer[event.code] = true
    console.log("Click de prueba")

})

document.addEventListener('keyup', function (event) {

    delete inputArrowsPlayer[event.code]
    console.log("Click de prueba")

})

HumanPlayer.prototype.fillData = function () {

    for (let input in inputArrowsPlayer) {

        if (input == "ArrowLeft") {

            this.bars.changeBarPosition(-5, height - 20)
            console.log("Click de prueba izquierda")


        } else if (input == "ArrowRight") {

            this.bars.changeBarPosition(4, height - 20)
            console.log("Click de derecha")

        } else {

            this.bars.changeBarPosition(0, height - 20)

        }

    }

}

ComputerPlayer.prototype.fillData = function (ball) {

    let data = -((this.bars.x + (this.bars.width / 2) - ball.x))

    if (data < 0 && data < -4) {

        data = -5

    } else if (data > 0 && data > 4) {
        
        data = 5

    }

    this.bars.changeBarPosition(data, 0)

    if (this.bars.x < 0) {

        this.bars = 0

    } else if (this.x + this.width > width) {

        this.x = width - this.width

    }

}


Bars.prototype.changeBarPosition = function (x, y) {

    this.x += x
    this.y = y
    this.horizontalSpeed = x
    this.verticalSpeed = y

    if (this.x < 0) {

        this.x = 0
        this.horizontalSpeed = 0

    } else if (this.x + this.width > width) {

        this.x = width - this.width
        this.horizontalSpeed = 0

    }

}

Ball.prototype.fillData = function (player, cpu) {

    this.x += this.horizontalSpeed
    this.y += this.verticalSpeed

    if (this.x - this.radius < 0) {

        this.x = 5
        this.horizontalSpeed = -this.horizontalSpeed

    } else if (this.x + this.radius > width) {

        this.x = width - this.radius
        this.horizontalSpeed = -this.horizontalSpeed

    }

    if (this.y - this.radius < 0 || this.y + this.radius > height) {

        if (this.y + this.radius < 0) {

            pointsPayer += 1

        } else if (this.y + this.radius > height) {

            pointsCPU += 1
            
        }

        this.horizontalSpeed = 0
        this.verticalSpeed = 4
        this.x = width / 2
        this.y = height / 2

    }

    if (this.y > width / 2) {

        if ((this.y - this.radius) < (player.y + player.height) && (this.y + this.radius) > player.y && (this.x - this.radius) < (player.x + player.width) && (this.x + this.radius) > player.x) {
            
            this.verticalSpeed = -this.verticalSpeed
            this.horizontalSpeed += (player.horizontalSpeed / 2)
            this.y += this.verticalSpeed

        }

    } else {

        if ((this.y - this.radius) < (cpu.y + cpu.height) && (this.y + this.radius) > cpu.y && (this.x - this.radius) < (cpu.x + cpu.width) && (this.x + this.radius) > cpu.x) {
            
            this.verticalSpeed = -this.verticalSpeed
            this.x += (cpu.horizontalSpeed / 2)
            this.y += this.verticalSpeed

        }

    }
}


/*Main function*/
function eject() {

    viewsElements()
    requestAnimationFrame(eject)
    fillData()

} eject()


