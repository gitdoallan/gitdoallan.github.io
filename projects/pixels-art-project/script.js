const colorPalette = document.getElementById('color-palette')
const changeBtn = document.getElementById('change-colors')
function generateColorsDiv() {
    colorPalette.innerHTML = ''
    for (let i=0;i<4;i+=1) {
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        newColor = document.createElement('div')
        colorPalette.appendChild(newColor)
        newColor.className = 'color'
        newColor.style.backgroundColor = `#${randomColor}`
        if (i === 0) {
            newColor.classList.add('selected')
            newColor.style.backgroundColor = 'black'
        }
    }
}
generateColorsDiv()
changeBtn.addEventListener('click', generateColorsDiv)

const superChangeBtn = document.getElementById('super-change')
let isXablauActive = false
function superChange() {
    xablau = setInterval(function() {
        generateColorsDiv()
        }, 500) 
}

function checkXablau() {
    if (isXablauActive === true) {
        clearInterval(xablau)
        isXablauActive = false
    } else {
        isXablauActive = true
        superChange()
    }
}
superChangeBtn.addEventListener('click', checkXablau)

let targetColor = 'rgb(0, 0, 0)'
function pickColor(e) {
    let colorPaletteChild = colorPalette.children
    for (let i=0;i<colorPaletteChild.length;i+=1) {
        if (colorPaletteChild[i].classList.contains('selected') && colorPaletteChild[i] !== e.target)
        colorPaletteChild[i].classList.remove('selected')
    }
    e.target.classList.add('selected')
    targetColor = getComputedStyle(e.target).backgroundColor
}
colorPalette.addEventListener('click', pickColor)

const generateBtn = document.getElementById('generate-board')
const pixelBoard = document.getElementById('pixel-board')
function theBoard(pixels) {
    let boardSize = pixels*40
    let boardPixels = pixels*pixels
    pixelBoard.innerHTML = ''
    pixelBoard.style.width = `${boardSize}px`
    pixelBoard.style.height = `${boardSize}px`
    for(let i=0; i<boardPixels; i+=1) {
        let singlePixel = document.createElement('div')
        pixelBoard.appendChild(singlePixel)
        singlePixel.className = 'pixel'
    }
    document.getElementById('board-size').value = ''
}
theBoard(5)

function checkBoard() {
    pixels = document.getElementById('board-size').value
    if (pixels === '' || pixels<0) {
        return alert('Board inválido!')
    }
    if (pixels<5) {
        pixels = 5
    }
    if (pixels>50) {
        pixels = 50
    }
    theBoard(pixels)
}
generateBtn.addEventListener('click',checkBoard)

let boardSizeInput = document.getElementById('board-size')
function keypress(e) {
    if (e.key === 'Enter') {
        checkBoard()
    }
}
boardSizeInput.addEventListener('keyup', keypress)

function receiveColor(e) {
    e.target.style.backgroundColor = targetColor
}
pixelBoard.addEventListener('click', receiveColor)

const clearBtn = document.getElementById('clear-board')
let pixelBoardChild = pixelBoard.children
function clearBoard() {
    for(let i=0;i<pixelBoardChild.length;i+=1) {
        pixelBoardChild[i].style.backgroundColor = 'white'
    }
}
clearBtn.addEventListener('click',clearBoard)