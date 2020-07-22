function init() {
  // * Dom Elements
  const grid = document.querySelector('.grid')
  const cells = []
  const scoreboard = document.querySelector('#score')
  const highscoreboard = document.querySelector('#highscore')
  const startTheGame = document.querySelector('#STARTGAME')
  const stopTheGame = document.querySelector('#RESETGAME')
  const musicOn = document.querySelector('#music')
  const musicOff = document.querySelector('#noMusic')
  let gametimer = null
  let highScore = 0
  const wrap = document.querySelector('#wrap')
  const gameOverScreen = document.createElement('div')
  gameOverScreen.id = 'gameOverScreenID'
  gameOverScreen.width = '750px'
  gameOverScreen.height = '750px'
  const pikaSad = document.createElement('img')
  const pikaHappy = document.createElement('img')
  const youWinScreen = document.createElement('div')
  youWinScreen.id = 'youWinScreenID'
  youWinScreen.width = '750px'
  youWinScreen.height = '750px'
  let win = null
  // ---code for music---
  const BGM = new Audio('audio/gymlobby.mp3')
  BGM.volume = 0.2
  BGM.loop = true
  highScore = localStorage.getItem('highscore')
  highscoreboard.innerHTML = highScore
  
  // localStorage.setItem('highScore', playerScore) <-- redundant? useless? don't see another place where its declared before grabbing its value.. 
  

  // * grid variables
  const width = 25
  const cellCount = width * width
  
  //game objects

  class enemy {
    constructor(name, classname , scaredclassname, position) {
      this.name = name
      this.classname = classname
      this.scaredclass = scaredclassname
      this.position = position
      this.isDead = false
    }

    moveRandom(){
      if (!this.isDead){
        cells[this.position].classList.remove(this.classname)
        //declare variables needed for measurements
        const x = this.position % width
        const y = Math.floor(this.position / width)
        //create random number to choose path to come
        const randomDirection = Math.floor(Math.random() * 4)
    
        if (randomDirection === 0){
          this.deathOfEither()
          if (x < width - 1 && !cells[this.position - width].classList.contains('maze'))
          {this.position = this.position - width
          } 
        }   else if (randomDirection === 1){
          if (x > 0 && !cells[this.position - 1].classList.contains('maze')) {
            this.position = this.position - 1 
          } 
        }   else if (randomDirection === 2) {
          if (y < width - 1  && !cells[this.position + width].classList.contains('maze')) {
            this.position = this.position + width
          } 
        }   else if (randomDirection === 3){
          if (x < width - 1 && !cells[this.position + 1].classList.contains('maze')){ 
            this.position = this.position + 1
          } 
        } if (!gameOver && !this.isDead){cells[this.position].classList.add(this.classname)}
      } 
    }
  
    follow(){
      if (!this.isDead) {
        cells[this.position].classList.remove(this.classname)
        cells[this.position].classList.remove(this.scaredclass)
        
        const x = this.position % width
        const y = Math.floor(this.position / width)
        this.deathOfEither()
        if (playerPosition > this.position && playerPosition - this.position < width)  {
          if (x < width - 1 && !cells[this.position + 1].classList.contains('maze')){ 
            this.position = this.position + 1
          } else this.moveRandom()
        }   else if (playerPosition > this.position){
          if (y < width - 1  && !cells[this.position + width].classList.contains('maze')) {
            this.position = this.position + width
          } else this.moveRandom()
        }   else if (playerPosition < this.position && this.position - playerPosition < width) {
          if (x > 0 && !cells[this.position - 1].classList.contains('maze')) {
            this.position = this.position - 1 
          } else this.moveRandom()
        }   else if (playerPosition < this.position)  {
          if (x < width - 1 && !cells[this.position - width].classList.contains('maze'))
          {this.position = this.position - width
          } else this.moveRandom()
        }
        if (!gameOver && !this.isDead){cells[this.position].classList.add(this.classname)}
      } 
    } 

    deathOfEither(){
      if (playerPosition === this.position && !cells[playerPosition].classList.contains('powerUp')){
        endTheGame()
        clearGrid()
        winOrLoseScreen()
        win = false
      } else if (playerPosition === this.position && cells[playerPosition].classList.contains('powerUp')){
        this.position = 337
        playerScore += 5000
        cells[this.position].classList.remove(this.classname)
        gameoverAudio()
        this.eggTimer()
      }

    }
  
    flee(){ 
      if (this.isDead === false) {
        cells[this.position].classList.remove(this.classname)
        this.deathOfEither()
        const x = this.position % width
        const y = Math.floor(this.position / width)
    
        if (playerPosition > this.position && playerPosition - this.position < width)  {
          if (x < width - 1 && !cells[this.position - 1].classList.contains('maze')){ 
            this.position = this.position - 1
          } else this.moveRandom()
        }   else if (playerPosition > this.position){
          if (y < width - 1  && !cells[this.position - width].classList.contains('maze')) {
            this.position = this.position - width
          } else this.moveRandom()
        }   else if (playerPosition < this.position && this.position - playerPosition < width) {
          if (x > 0 && !cells[this.position + 1].classList.contains('maze')) {
            this.position = this.position + 1 
          } else this.moveRandom()
        }   else if (playerPosition < this.position)  {
          if (x < width - 1 && !cells[this.position + width].classList.contains('maze'))
          {this.position = this.position + width
          } else this.moveRandom()
        }
        if (!gameOver && !this.isDead){
          cells[this.position].classList.add(this.classname)}
      } 
    }

    eggTimer() {
      this.isDead = true
      cells[this.position].classList.remove(this.classname)
      cells[this.position].classList.remove(this.classname)
      cells[337].classList.add('egg')
      setTimeout(() => {
        cells[337].classList.remove('egg')
        this.position = 337
        cells[this.position].classList.add(this.classname)
        this.isDead = false
      }, 6000)
    }
  }

  const enemyA = new enemy('enemy1', 'enemy1', 'scaredenemy1', 337, false)
  const enemyB = new enemy('enemy2', 'enemy2', 'scaredenemy2', 338, false)
  const enemyC = new enemy('enemy3', 'enemy3', 'scaredenemy3', 339, false)
  const enemyD = new enemy('enemy4', 'enemy4', 'scaredenemy4', 335, false)
  
  // * game variables
  let playerPosition = 0
  let playerScore = 0
  let cookiesRemaining = 212

  let poweredUp = false
  let gameOver = false
  
  function clearGrid (){
    for (let i = 0; i < 625; i++){
      cells[i].classList = null
      
    }
  }
  

  //------ GRID CREATION AND PLAYER/ENEMY RESET FUNCTION -------------
  function createGrid(startingPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
    }
    
    playerPosition = 487
    cells[playerPosition].classList.add('sprite')
    enemyA.position = 337
    cells[enemyA.position].classList.add('enemy1')
    enemyB.position = 335
    cells[enemyB.position].classList.add('enemy2')
    enemyC.position = 339
    cells[enemyC.position].classList.add('enemy3')
    enemyD.position = 338
    cells[enemyD.position].classList.add('enemy4')

  }

  //----------- MAZE CREATION FUNCTION-----------
  /// -----also creates cookies and powerups ----
  function createMaze(){
    const mazeCoords1 = 
    [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,53,54,55,78,103,104,105,106,81,56,63,88,58,59,60,61,86,111,108,109,110,
      83,65, 66, 67, 68, 70, 71, 72, 73, 90, 93, 95, 98, 115, 116, 117, 118, 120, 121, 122, 123, 153, 154, 155, 156, 203, 204, 205, 206,178, 181, 170,
      171, 172, 173, 198, 195, 220, 221, 222, 223, 410, 411, 412, 413, 414, 415, 416, 438, 463, 358, 383, 408, 368, 393, 418, 318, 308, 553, 554, 555, 556, 557, 558,
      559, 560, 561, 565, 566, 567, 568, 569, 570, 571, 572, 573, 523, 524, 503, 502, 238, 158, 183, 208, 233, 258, 283, 168, 193, 218, 243, 268, 293, 270, 271, 
      272, 273, 274, 252, 253, 254, 255, 256, 281, 306, 295, 302, 291, 285,310, 335, 302, 303, 304, 305, 320, 321, 322, 323, 324, 352, 353, 354, 
      356, 381, 402, 403, 404, 405, 406, 370, 371, 372, 373, 374, 395, 420, 421, 422, 423, 424, 234, 235, 236, 240, 241, 242, 310, 335, 360, 361, 365,
      366, 316, 341, 453, 454, 455, 480, 505, 457, 458, 459, 460, 461, 507, 532, 471, 472, 473, 496, 521, 519, 538, 563, 465, 466, 467, 468, 509, 510, 511,331, 345,
      512, 513, 514, 515, 516, 517, 469, 50, 75, 100, 125, 150, 175, 200, 225, 250,275, 300, 325, 350, 375, 400, 425, 450, 475, 500, 525, 550, 575, 600, 625, 601,
      602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617,618, 619, 620, 621, 622, 623, 624, 26,51, 76, 101, 126, 151, 176, 201, 226, 251,
      276, 301, 326, 351, 376, 401, 426, 451, 476, 501, 526, 551, 576, 160, 185, 161,162, 163, 164, 165, 166, 186, 187, 188, 189, 190, 191, 355, 544, 213

    ]
    mazeCoords1.map( coord =>{
      cells[coord-1].classList.add('maze')
    })

    //----- cookie creation ------

    const cookieCoords1 = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 52, 57,62, 64, 69, 74, 82, 87, 89, 94,
      102, 107, 112, 113, 114, 119, 124, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149,
      152, 157, 159, 167, 169, 174, 177, 182, 184, 192, 194, 199, 202, 207, 209, 210, 211, 212, 214, 215, 216, 217, 219, 224, 227, 228, 229, 230, 231, 232, 
      244, 245, 246, 247, 248, 249, 257, 269, 282, 294, 307, 319, 332, 344, 357, 369, 382, 394, 407, 419, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437,
      439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 452, 456, 462, 464, 470, 474, 478, 479, 481, 482, 483, 484, 485, 486, 487, 489, 490, 491, 492, 493, 
      494, 495, 497, 498, 504, 506, 508, 518, 520, 522, 527, 528, 529, 530, 531, 533, 534, 535, 536, 537, 539, 540, 541, 542, 543, 545, 546, 547, 548, 549,
      552, 562, 564, 574, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599
    ]

    cookieCoords1.map( coord =>{
      cells[coord - 1].classList.add('cookie')
    })
    // ----- POWERUP CREATION ----------
    const pokeballCoords1 = [499, 477, 99, 77 ]
    pokeballCoords1.map( coord =>{
      cells[coord - 1].classList.add('pokeBall')
    })
  }
  // ---------------PLAYER MOVE WITH MAZE COLLISION DETECTION FUNCTION ---------------

  function handleKeyUp(event) {if (!gameOver) {{
    cells[playerPosition].classList.remove('sprite') 
    cells[playerPosition].classList.remove('powerUp') 
    
    const x = playerPosition % width
    const y = Math.floor(playerPosition / width)
    //finding the solution below was more painful and arduous than I care to admit.
    if (event.keyCode === 39 || event.keyCode === 68 ) {
      if (x < width - 1 && !cells[playerPosition + 1].classList.contains('maze')){
        playerPosition = playerPosition + 1 
      }
    } else if (event.keyCode === 37 || event.keyCode === 65) {
      if (x > 0 && !cells[playerPosition - 1].classList.contains('maze')) {
        playerPosition = playerPosition - 1 
      }    
    } else if (event.keyCode === 38 || event.keyCode === 87) {
      if (y > 0 && !cells[playerPosition - width].classList.contains('maze')) {
        playerPosition = playerPosition - width
      }
    } else if (event.keyCode === 40 || event.keyCode === 83){
      if (y < width - 1  && !cells[playerPosition + width].classList.contains('maze')) {
        playerPosition = playerPosition + width
      }
    } 
    //sprite reapplication in whatever position has been decided above
    if (poweredUp === false) {
      cells[playerPosition].classList.add('sprite') 
    } else if (poweredUp === true){
      cells[playerPosition].classList.add('powerUp') 
    }
    //check for and eat cookies, log points
    if (cells[playerPosition].classList.contains('cookie')){
      cells[playerPosition].classList.remove('cookie')
      playerScore += 100
      cookiesRemaining -= 1
      if (cookiesRemaining === 0){
        console.log('YOU WIN')
        checkHiScore()
        youWinGraphic()
        win = true
        highScore = localStorage.getItem('highscore')
        if (highScore > playerScore){
          highscoreboard.innerHTML = highScore
        }
        gameOver = true
      }
      scoreboard.innerHTML = playerScore
    }
    if (cells[playerPosition].classList.contains('pokeBall')){
      cells[playerPosition].classList.remove('pokeBall')
      cells[playerPosition].classList.add('powerUp')
      powerupAudio()
      poweredUp = true
      setTimeout(() => {
        cells[playerPosition].classList.remove('powerUp')
        poweredUp = false
      }, 5000)
    }
  }
  }
  }

  //---------- ENEMY TIMER --------

  function startTimer(){
    if (gameOver) {
      clearInterval(gametimer)
    } else {
      gametimer = setInterval(()=>{ 
        if (!gameOver){
          moveEnemies()
        }
      }, 300)
    }
  }

  function moveEnemies(){
    if (poweredUp === false && !gameOver){
      if (!enemyA.isDead) {
        enemyA.follow()
      }
      if (!enemyB.isDead) {
        enemyB.follow()
      }
      if (!enemyC.isDead) {
        enemyC.follow()
      }
      if (!enemyD.isDead) {
        enemyD.follow()
      }
    } else if (poweredUp === true && !gameOver){
      if (!enemyA.isDead) {
        enemyA.flee()
      }
      if (!enemyB.isDead) {
        enemyB.flee()
      }
      if (!enemyC.isDead) {
        enemyC.flee()
      }
      if (!enemyD.isDead) {
        enemyD.flee()
      }
      
    }
  }

  function endTheGame(){
    gameoverAudio()
    checkHiScore()
    clearInterval(gametimer)
    gameOver = true
    clearGrid()
    highScore = localStorage.getItem('highscore')
    highscoreboard.innerHTML = highScore
  }

  function stopGame(){
    if (!win || win){
      clearWinOrLoseScreen()
    }
    clearInterval(gametimer)
    BGM.pause()
    BGM.currentTime = 0
    win = null
    playerScore = 0
    cells[enemyA.position].classList.remove('enemy1')
    cells[enemyB.position].classList.remove('enemy2')
    cells[enemyC.position].classList.remove('enemy3')
    cells[enemyD.position].classList.remove('enemy4')
    clearGrid()
    scoreboard.innerHTML = playerScore
    highScore = localStorage.getItem('highscore')
    highscoreboard.innerHTML = highScore
    cookiesRemaining = 212
    playerPosition = 487
    cells[playerPosition].classList.add('sprite')
    // createGrid(playerPosition)
    createMaze()
    playerPosition = 487
    cells[playerPosition].classList.add('sprite')
    enemyA.position = 337
    cells[enemyA.position].classList.add('enemy1')
    enemyB.position = 335
    cells[enemyB.position].classList.add('enemy2')
    enemyC.position = 339
    cells[enemyC.position].classList.add('enemy3')
    enemyD.position = 338
    cells[enemyD.position].classList.add('enemy4')
    gameOver = true
    
  }
  function resetGame(){
    if (!win || win){
      clearWinOrLoseScreen()
    }
    BGM.currentTime = 0
    BGM.play()
    win = null
    cells[enemyA.position].classList.remove('enemy1')
    cells[enemyB.position].classList.remove('enemy2')
    cells[enemyC.position].classList.remove('enemy3')
    cells[enemyD.position].classList.remove('enemy4')
    clearInterval(gametimer)
    gameOver = false
    playerScore = 0
    scoreboard.innerHTML = playerScore
    createMaze()
    startTimer()
    cookiesRemaining = 212
    playerPosition = 487
    cells[playerPosition].classList.add('sprite')
    enemyA.position = 337
    cells[enemyA.position].classList.add('enemy1')
    enemyB.position = 335
    cells[enemyB.position].classList.add('enemy2')
    enemyC.position = 339
    cells[enemyC.position].classList.add('enemy3')
    enemyD.position = 338
    cells[enemyD.position].classList.add('enemy4')

  }
  

  function winOrLoseScreen(){
    if (!win){
      GameOverGraphic()
      BGM.pause()
      console.log("this is win or lose LOSE screen firing")
    } else {
      youWinGraphic()
      BGM.pause()
      console.log("this is you win choice firing")
    }
  }

  function clearWinOrLoseScreen(){
    if (win === false){
      clearGOScreen()
      console.log("this is clear GO screen firing")
    } else if (win === true){
      clearWINScreen()
      console.log("this is clear win screen firing")
    }
  }
  function clearGOScreen(){
    if (win === false){
    wrap.removeChild(gameOverScreen)
    }
  }

  function clearWINScreen(){
    if (win === true){
    wrap.removeChild(youWinScreen)
    }
  }

  function powerupAudio() {
    const powerAudio = new Audio('audio/FoundItem.mp3')
    powerAudio.play()
  }
  

  function gameoverAudio() {
    const gamedeathAudio = new Audio('audio/bomb.wav')
    gamedeathAudio.play()
  }

  // function checkHiScore(){
  //   if (playerScore > highScore){
  //     highScore = playerScore
  //   }
  // }

  function checkHiScore(){
    highScore = localStorage.getItem('highscore')
    if (playerScore > highScore){
      localStorage.setItem('highscore', playerScore)
    } 
    highScore = localStorage.getItem('highscore')
    highscoreboard.innerHTML = highScore
  }

  function GameOverGraphic(){
    gameOverScreen.appendChild(pikaSad)
    wrap.appendChild(gameOverScreen)
  }

  function youWinGraphic(){
    youWinScreen.appendChild(pikaHappy)
    wrap.appendChild(youWinScreen)
    console.log("you win graphic firing")
  }

  setTimeout(() => {
    cells[playerPosition].classList.remove('powerUp')
    poweredUp = false
  }, 5000)
  
  
  function toggleBGMOn(){
    BGM.volume = 0.2
  }
  function toggleBGMOff(){
    BGM.volume = 0
  }
  
  

  // * Event listeners

  document.addEventListener('keyup', handleKeyUp)
  // document.addEventListener('keyup', toggleBGM)
  startTheGame.addEventListener('click', resetGame)
  stopTheGame.addEventListener('click', stopGame)
  musicOn.addEventListener('click', toggleBGMOn)
  musicOff.addEventListener('click', toggleBGMOff)
  // startGame()
  createGrid(playerPosition)
  createMaze()
  gameOver = true
 
  stopGame()
}

window.addEventListener('DOMContentLoaded', init)