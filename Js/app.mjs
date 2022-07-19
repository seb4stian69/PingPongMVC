// Variables globales
let widthGlobal
let heightGlobal
let playingGlobal = false
let gameOverGlobal = false
let bars = []
let ball = null
const canvas = document.getElementById("canvas")
let contexto = canvas.getContext('2d')


// Funcion inicial
class board {

    #widthBoard
    #heightBoard

    constructor(height,width){
        
        this.heightBoard = height
        this.widthBoard = width

    }

    getWidth(){
        return this.widthBoard
    }

    getheight(){
        return this.heightBoard
    }

}

let objectBoard = null // Objeto global

// Retornar elementos
const getElements = () =>{

    let elements = bars
    elements.push(ball)
    return elements

}

// Pintar tablero
const seeBoard = (height, width) =>{

    objectBoard = new board(height,width) // Objeto global
    canvas.width = objectBoard.getWidth()
    canvas.height  = objectBoard.getheight()

}


// Funcion principal que lanza la aplicacio
const eject = () => {
    seeBoard(300,600)
}; eject()