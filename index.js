
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 6.25
const blockHeight = 1.25
const ballDiameter = 1.25
const boardWidth = 35
const boardHeigth = 18.7
let timerId
let xDirection = -0.12
let yDirection = 0.12
let score = 0

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
    ballCurrentPossition[0] += xDirection
    ballCurrentPossition[1] += yDirection
    drawBall()
    checkForCollisions()
}
timerId = setInterval(moveBall, 30)

// Check for collisions
function checkForCollisions() {
    // check for block collisions
    for (let i = 0; i < blocks.length; i++){
        if (
            (ballCurrentPossition[0] > blocks[i].bottomLeft[0] && ballCurrentPossition[0] < blocks[i].bottomRight[0]) && ((ballCurrentPossition[1] + ballDiameter ) > blocks[i].bottomLeft[1] && ballCurrentPossition[1] <blocks[i] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score

            //check for win
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = '😎 YOU WIN 😎'
                clearInterval(timerId)
                document.removeEventListener('keydown' , moveUser)
            }
        }
    }

    //check for wall collisions
    if (ballCurrentPossition[0] >= (boardWidth - ballDiameter) || ballCurrentPossition[1] >= (boardHeigth - ballDiameter) || ballCurrentPossition[0] <= 0 
    ) {
        changeDirection()
    }

    // Check for UserColisions -><-
    if (
        (ballCurrentPossition[0] > currentPosition[0] && ballCurrentPossition[0] < currentPosition[0] + blockWidth ) && (ballCurrentPossition[1] > currentPosition[1] && ballCurrentPossition[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection()
    }


    //Check for Game Over
    if (ballCurrentPossition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = '¡ You Lose !'
        document.removeEventListener('keydown', moveUser)
    }
}

function changeDirection() {
    if (xDirection === 0.12 && yDirection === 0.12) {
        yDirection = -0.12
        return
    }

    if (xDirection === 0.12 && yDirection === -0.12){
        xDirection = -0.12
        return
    }

    if (xDirection === -0.12 && yDirection === -0.12) {
        yDirection = 0.12
        return

    }

    if (xDirection === -0.12 && yDirection === 0.12){
        xDirection = 0.12
        return

    }

}