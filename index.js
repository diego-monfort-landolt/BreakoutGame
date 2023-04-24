
const grid = document.querySelector('.grid')
const blockWidth = 6.25
const blockHeight = 1.25
const boardWidth = 35

const userStart = [14.3, 0.62]
let currentPosition = userStart

const ballStart = [16.87, 2.5]
let ballCurrentPossition = ballStart

//create block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

//all my blocks
const blocks =  [
    new Block(0.62,16.8),
    new Block(7.5,16.8),
    new Block(14.3,16.8),
    new Block(21.2,16.8),
    new Block(28.1,16.8),

    new Block(0.62,15),
    new Block(7.5,15),
    new Block(14.3,15),
    new Block(21.2,15),
    new Block(28.1,15),

    new Block(0.62,13.2),
    new Block(7.5,13.2),
    new Block(14.3,13.2),
    new Block(21.2,13.2),
    new Block(28.1,13.2)

]

//draw all my block - meinen block zeichnen
function addBlocks() {

for (let i =0 ; i < blocks.length; i++) {

    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'rem'
    block.style.bottom = blocks[i].bottomLeft[1] + 'rem'
    grid.appendChild(block)
}

}

addBlocks()

//add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)


// draw the user
function drawUser() {
    user.style.left = currentPosition[0] + 'rem'
    user.style.bottom = currentPosition[1] + 'rem'
}
// draw the Ball
function drawBall() {
    ball.style.left = ballCurrentPossition[0] + 'rem'
    ball.style.bottom = ballCurrentPossition[1] + 'rem'
}

//move user
function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 0.52
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 0.47
                drawUser()
            }
            break;
    }
}


document.addEventListener('keydown', moveUser)

//add Ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//move the Ball
function moveBall() {
    ballCurrentPossition[0] += 0.12
    ballCurrentPossition[1] += 0.12
    drawBall()
}
setInterval(moveBall, 30)