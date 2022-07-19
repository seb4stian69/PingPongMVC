// Importamos las variables de "entorno"
import { width,height,canvas,ctx } from "./env.mjs"

// Objeto canvas
canvas.width = width
canvas.height = height


export const EjectViews = () => {
    
    /*Elementos globales*/
    let player = new HumanPlayer() // Jugador
    let computer = new ComputerPlayer() // CPU
    let ball = new Ball( (width/2)+10 ,  (height/2) ) // Ball

    /*Global - Views*/

    let viewsElements = () =>  {

        // Se actualiza el elemento mostrandolo desde 0 
        ctx.clearRect(0, 0, width, height)
        // Se muestra el elemento [Bars] player
        player.viewsElements()
        // Se muestra el elemento [Bars] cpu
        computer.viewsElements()
        // Se muestra el elemento [Ball]
        ball.viewsElements()

    }

    let fillData = () =>  {

        // Se agregan los datos de player
        player.fillData()
        // Se agregan los datos del CPU
        computer.fillData(ball)
        // Se muestra la pelota
        ball.fillData(player.bars, computer.bars)

    }

    /* Instancia y creacion de elementos */ 

    function HumanPlayer() {
        this.bars = new Bars(width / 2 - 30, height - 20, 80, 20)
    }
    function ComputerPlayer() {
        this.bars = new Bars(width / 2 - 30, 0, 80, 20)
    }
    HumanPlayer.prototype.viewsElements = () => {
        this.bars.viewsElements()
    }
    ComputerPlayer.prototype.viewsElements = () =>  {
        this.bars.viewsElements()
    }
    function Ball(x, y) {

        this.x = x
        this.y = y
        this.horizontalSpeed = 0
        this.verticalSpeed = 3
        this.radius = 6

    }
    Ball.prototype.viewsElements = () =>  {

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
    Bars.prototype.viewsElements = () =>  {

        ctx.beginPath()
        ctx.fillStyle = "#111"
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.closePath()

    }

    viewsElements()
    fillData()

}