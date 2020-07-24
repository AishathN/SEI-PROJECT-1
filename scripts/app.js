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
  let berryTimer = null
  let powerUpTimer = null
  let highScore = 0
  let win = null

  //creating divs for game over and you win screens, to be appended at the appropriate time
  const wrap = document.querySelector('#wrap')
  const gameOverScreen = document.createElement('div')
  gameOverScreen.id = 'gameOverScreenID'
  gameOverScreen.width = '550px'
  gameOverScreen.height = '450px'
  const pikaSad = document.createElement('img')
  const pikaHappy = document.createElement('img')
  const youWinScreen = document.createElement('div')
  youWinScreen.id = 'youWinScreenID'
  youWinScreen.width = '550px'
  youWinScreen.height = '450px'
  const welcome = document.createElement('div')
  const pikaWelcome = document.createElement('img')
  welcome.id = 'welcomeID'
  welcome.width = '500px'
  welcome.height = '400px'


  // --- code for music --- needs to exist prior to other audio hence positioning
  const BGM = new Audio('audio/gymlobby.mp3')
  BGM.volume = 0.2
  BGM.loop = true
  //highscore storage setup
  highScore = localStorage.getItem('highscore')
  highscoreboard.innerHTML = highScore

  // * grid variables
  const width = 25
  const cellCount = width * width
  
  //game objects

  class enemy {
    constructor(name, classname , scaredclassname, position) {
      this.name = name
      this.classname = classname
      this.position = position
      this.isDead = false //< -- needed for egg timer
    }
    //random movement function 
    moveRandom(){
      if (!this.isDead){
        cells[this.position].classList.remove(this.classname)
        const x = this.position % width
        const y = Math.floor(this.position / width)
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
    //enemy chase function 
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
    //enemy check for death of player/enemy and either starts egg or ends game
    deathOfEither(){
      if (playerPosition === this.position && !cells[playerPosition].classList.contains('powerUp')){
        endTheGame()
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
    //enemy run away function
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
    //checks if enemy is dead and if so spawns egg and timer
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

  //create enemies from constructor function 
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
  
  //clears game grid of all classes for reset or game over

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
  /// -----also creates apples and powerups ----
  function createMaze(){
    const mazeCoords1 = 
    [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 50, 53, 54, 55, 78, 51, 56,
      58, 59, 60, 61, 63, 65, 66, 67, 68, 70, 71, 72, 73, 75,76, 81, 83, 84, 85,86, 88, 90,91, 92, 93, 95, 98,
      100,101, 103,104,105,106,108,109,110,111,115, 116, 117, 118, 120, 121, 122, 123, 125, 126, 150,151, 153, 154, 155, 156, 158, 160, 161,162, 163, 164, 165, 166, 168, 170,171,
      172, 173, 175, 176, 178,179,180, 181, 183, 185, 186, 187, 188, 189, 190, 191 ,193, 195, 196,197, 198,
      200, 203, 204, 205, 206, 208, 213, 218, 220, 221, 222, 223, 225, 226, 234, 235, 236, 238, 240, 241, 242,243, 252, 253, 254, 255, 256, 268, 270, 271, 272, 273, 274, 276,  281,
      250,275,201, 251,295,291, 285, 233, 258, 283,  293, 277, 279,
      306, 301, 326, 310, 335, 318, 308, 320, 352, 353, 354, 300, 325, 350, 375, 351, 346, 347, 348, 349,
      376, 370, 371, 372, 373, 374, 380, 395, 310, 335, 360, 361, 365, 358, 383,  368, 393, 331, 345, 356, 381, 366, 316, 341,
      402, 403, 404, 405, 406, 408,  420, 421, 422, 423, 424, 401, 426, 451, 476,  418, 453, 454, 455, 480, 457, 458, 459, 460, 
      461, 465, 466, 467, 468, 471, 472, 473,  410, 411, 412, 413, 414, 415, 416, 438, 463, 496,469,  400, 425, 450, 475,
      521, 519, 538, 563, 505, 509, 510, 511, 512, 513, 514, 515, 516, 517,  500, 525, 550, 575, 501, 526, 551, 576, 355, 544, 
      553, 554, 555, 556, 557, 558,507, 532, 559, 560, 561, 565, 566, 567, 568, 569, 570, 571, 572, 573, 523, 524, 503, 502,
      602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617,618, 619, 620, 621, 622, 623, 624, 600, 625, 601

    ]
    mazeCoords1.map( coord =>{
      cells[coord-1].classList.add('maze')
    })

    //assigning custom town and environment pieces below
    cells[301].classList.add('townpieceA')
    cells[302].classList.add('townpieceB')
    cells[303].classList.add('townpieceC')
    cells[304].classList.add('townpieceD')
    cells[326].classList.add('townpieceE')
    cells[327].classList.add('townpieceF')
    cells[328].classList.add('townpieceG')
    cells[329].classList.add('townpieceH')

    cells[295].classList.add('townpieceA')
    cells[296].classList.add('townpieceB')
    cells[297].classList.add('townpieceC')
    cells[298].classList.add('townpieceD')
    cells[320].classList.add('townpieceE')
    cells[321].classList.add('townpieceF')
    cells[322].classList.add('townpieceG')
    cells[323].classList.add('townpieceH')

    cells[277].classList.add('townpieceA')
    cells[279].classList.add('townpieceD')
    cells[78].classList.add('lake1')
    cells[79].classList.add('lake2')
    cells[95].classList.add('lake1')
    cells[96].classList.add('lake2')
    cells[396].classList.add('lake1')
    cells[397].classList.add('lake2')
    cells[395].classList.add('townpieceA')
    cells[398].classList.add('townpieceD')

    cells[376].classList.add('townpieceA')
    cells[377].classList.add('townpieceH')
    cells[378].classList.add('townpieceD')

    //----- apple creation ------

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

  function handleKeyDown(event) {if (!gameOver) {{
    pikaCollision()
    cells[playerPosition].classList.remove('sprite') 
    cells[playerPosition].classList.remove('powerUp') 
    
    const x = playerPosition % width
    const y = Math.floor(playerPosition / width)
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
      getItem()
      playerScore += 100
      cookiesRemaining -= 1
      //-----------WINNING CONDITION HERE------------
      if (cookiesRemaining === 0){
        toggleBGMOff()
        youWinAudio()
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
    //bonus points item check 
    if (cells[playerPosition].classList.contains('berry')){
      cells[playerPosition].classList.remove('berry')
      playerScore += 8000
      starObtained()
      
    }
    //powerup item check 
    if (cells[playerPosition].classList.contains('pokeBall')){
      poweringUp()
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
      }, 220)
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

  //end game function 

  function endTheGame(){
    gameoverAudio()
    checkHiScore()
    clearInterval(gametimer)
    clearInterval(berryTimer)
    gameOver = true
    highScore = localStorage.getItem('highscore')
    highscoreboard.innerHTML = highScore
  }

  //this function resets all elements but does not move enemies

  function stopGame(){
    if (!win || win){
      clearWinOrLoseScreen()
    }
    clearInterval(gametimer)
    clearInterval(berryTimer)
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

  //this function begins the game movement

  function resetGame(){
    if (!win || win){
      clearWinOrLoseScreen()
    }
    BGM.currentTime = 0
    BGM.play()
    // BGM.volume = 0.2
    win = null
    cells[enemyA.position].classList.remove('enemy1')
    cells[enemyB.position].classList.remove('enemy2')
    cells[enemyC.position].classList.remove('enemy3')
    cells[enemyD.position].classList.remove('enemy4')
    clearInterval(gametimer)
    clearInterval(berryTimer)
    gameOver = false
    playerScore = 0
    scoreboard.innerHTML = playerScore
    createMaze()
    startTimer()
    startBerryTimer()
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
  
  //win and lose screen spawn/despawn functions below

  function winOrLoseScreen(){
    if (!win){
      GameOverGraphic()
      BGM.pause()
    } else {
      youWinGraphic()
      BGM.pause()
    }
  }

  function clearWinOrLoseScreen(){
    if (win === false){
      clearGOScreen()
    } else if (win === true){
      clearWINScreen()
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

  //audio functions here 

  function powerupAudio() {
    const powerAudio = new Audio('audio/FoundItem.mp3')
    powerAudio.volume = 0.4
    powerAudio.play()
  }

  function starObtained() {
    const starAudio = new Audio('audio/starjingle.mp3')
    starAudio.volume = 0.4
    starAudio.play()
  }

  function gameoverAudio() {
    const gamedeathAudio = new Audio('audio/bomb.wav')
    gamedeathAudio.volume = 0.4
    gamedeathAudio.play()
  }
  function youWinAudio() {
    const winAudio = new Audio('audio/youwin.mp3')
    winAudio.volume = 0.4
    winAudio.play()
  }

  function getItem() {
    const eatItem = new Audio('audio/eatapple2.mp3')
    eatItem.volume = 0.1
    eatItem.play()
  }
  //high score check

  function checkHiScore(){
    highScore = localStorage.getItem('highscore')
    if (playerScore > highScore){
      localStorage.setItem('highscore', playerScore)
    } 
    highScore = localStorage.getItem('highscore')
    highscoreboard.innerHTML = highScore
  }

  //game over and you win graphics, and welcome screen

  function GameOverGraphic(){
    gameOverScreen.appendChild(pikaSad)
    wrap.appendChild(gameOverScreen)
  }

  function youWinGraphic(){
    youWinScreen.appendChild(pikaHappy)
    wrap.appendChild(youWinScreen)
  }

  function welcomeTotheGame(){
    welcome.appendChild(pikaWelcome)
    wrap.appendChild(welcome)
  }

  //removing powerup from player after time limit

  setTimeout(() => {
    cells[playerPosition].classList.remove('powerUp')
    poweredUp = false
  }, 5000)
  
  //gackground music volume to zero or low

  function toggleBGMOn(){
    BGM.volume = 0.2
  }
  function toggleBGMOff(){
    BGM.volume = 0
  }

  //nested berry timer function

  function startBerryTimer() {
    berryTimer = setInterval(() => {
      cells[362].classList.add('berry')
      startBerries()
    }, 30000)
  }
  function startBerries(){
    if (cells[362].classList.contains('berry')){
      berryTimer = setTimeout(() => {
        cells[362].classList.remove('berry')
      }, 15000)
    }
  }

  //extra collision detection on player side
  // last minute addition to help counter phasing through enemies, hence wordiness.

  function pikaCollision(){
    if (playerPosition === enemyA.position && !cells[playerPosition].classList.contains('powerUp')){
      endTheGame()
      winOrLoseScreen()
      win = false
    } else if (playerPosition === enemyA.position && cells[playerPosition].classList.contains('powerUp')){
      cells[enemyA.position].classList.remove(enemyA.classname)
      enemyA.position = 337
      playerScore += 5000
      cells[enemyA.position].classList.remove(enemyA.classname)
      gameoverAudio()
      enemyA.eggTimer()
    } else if (playerPosition === enemyB.position && !cells[playerPosition].classList.contains('powerUp')){
      endTheGame()
      winOrLoseScreen()
      win = false
    } else if (playerPosition === enemyB.position && cells[playerPosition].classList.contains('powerUp')){
      cells[enemyB.position].classList.remove(enemyB.classname)
      enemyB.position = 337
      playerScore += 5000
      cells[enemyB.position].classList.remove(enemyB.classname)
      gameoverAudio()
      enemyB.eggTimer()
    } else if (playerPosition === enemyC.position && !cells[playerPosition].classList.contains('powerUp')){
      endTheGame()
      winOrLoseScreen()
      win = false
    } else if (playerPosition === enemyC.position && cells[playerPosition].classList.contains('powerUp')){
      cells[enemyC.position].classList.remove(enemyC.classname)
      enemyC.position = 337
      playerScore += 5000
      cells[enemyC.position].classList.remove(enemyC.classname)
      gameoverAudio()
      enemyC.eggTimer()
    } else if (playerPosition === enemyD.position && !cells[playerPosition].classList.contains('powerUp')){
      endTheGame()
      winOrLoseScreen()
      win = false
    } else if (playerPosition === enemyD.position && cells[playerPosition].classList.contains('powerUp')){
      cells[enemyD.position].classList.remove(enemyD.classname)
      enemyD.position = 337
      playerScore += 5000
      cells[enemyD.position].classList.remove(enemyD.classname)
      gameoverAudio()
      enemyD.eggTimer()
    }
  } 

  // powerup functions with extra conditionals to prevent early loss of powerup if stacked
  function poweringUp(){
    if (!cells[playerPosition].classList.contains('powerUp')){
      powerUpTime()
    } else if (cells[playerPosition].classList.contains('powerUp')){
      clearTimeout(powerUpTimer)
      powerUpTime()
    }
  }
  function powerUpTime(){
    cells[playerPosition].classList.remove('pokeBall')
    cells[playerPosition].classList.add('powerUp')
    powerupAudio()
    poweredUp = true
    powerUpTimer = setTimeout(() => {
      cells[playerPosition].classList.remove('powerUp')
      poweredUp = false
    }, 5000)
  }

  // * Event listeners

  document.addEventListener('keydown', handleKeyDown)
  startTheGame.addEventListener('click', resetGame)
  stopTheGame.addEventListener('click', stopGame)
  musicOn.addEventListener('click', toggleBGMOn)
  musicOff.addEventListener('click', toggleBGMOff)
  createGrid(playerPosition)
  createMaze()
  gameOver = true
 
  //the below function initialises the game setup but does not start enemies
  //welcome screen added
  welcomeTotheGame()
  setTimeout(() => {
    wrap.removeChild(welcome)
  }, 4000)
  stopGame()
}

window.addEventListener('DOMContentLoaded', init)