function init() {
  // * Dom Elements
  const grid = document.querySelector('.grid')
  const cells = []

  // * grid variables
  const width = 25
  const cellCount = width * width

  // * game variables
  let playerPosition = 0
  let playerScore = 0
  // let cookieCount = 0
  let enemy1Position = 0
  // let enemy1Distance = 0
  let cookiesRemaining = 212
  let enemy2Position = 0


  //------ GRID CREATION AND PLAYER RESET -------------
  function createGrid(startingPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      // cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    cells[startingPosition + 487].classList.add('sprite')
    playerPosition = 487
    enemy1Position = 337
    cells[startingPosition + 337].classList.add('enemy1')
    enemy2Position = 335
    cells[startingPosition + 335].classList.add('enemy2')
    enemy3Position = 339
    cells[startingPosition + 339].classList.add('enemy3')

  }

  //----------- MAZE CREATION -----------
  function createMaze(){
    const mazeCoords1 = 
    [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,
      53,54,55,78,103,104,105,106,81,56,63,88,58,59,60,61,86,111,108,109,110,
      83,65, 66, 67, 68, 70, 71, 72, 73, 90, 93, 95, 98, 115, 116, 117, 118, 
      120, 121, 122, 123, 153, 154, 155, 156, 203, 204, 205, 206,178, 181, 170,
      171, 172, 173, 198, 195, 220, 221, 222, 223, 410, 411, 412, 413, 414, 415, 416,
      438, 463, 358, 383, 408, 368, 393, 418, 318, 308, 553, 554, 555, 556, 557, 558,
      559, 560, 561, 565, 566, 567, 568, 569, 570, 571, 572, 573, 523, 524, 503, 502,
      238, 158, 183, 208, 233, 258, 283, 168, 193, 218, 243, 268, 293, 270, 271, 
      272, 273, 274, 252, 253, 254, 255, 256, 281, 306, 295, 302, 291, 285,
      310, 335, 302, 303, 304, 305, 320, 321, 322, 323, 324, 352, 353, 354, 
      356, 381, 402, 403, 404, 405, 406, 370, 371, 372, 373, 374, 395, 420, 421, 422, 
      423, 424, 234, 235, 236, 240, 241, 242, 310, 335, 360, 361, 365,
      366, 316, 341, 453, 454, 455, 480, 505, 457, 458, 459, 460, 461, 507, 532, 471, 
      472, 473, 496, 521, 519, 538, 563, 465, 466, 467, 468, 509, 510, 511,331, 345,
      512, 513, 514, 515, 516, 517, 469, 50, 75, 100, 125, 150, 175, 200, 225, 250, 
      275, 300, 325, 350, 375, 400, 425, 450, 475, 500, 525, 550, 575, 600, 625, 601,
      602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 
      618, 619, 620, 621, 622, 623, 624, 26,51, 76, 101, 126, 151, 176, 201, 226, 251,
      276, 301, 326, 351, 376, 401, 426, 451, 476, 501, 526, 551, 576, 160, 185, 161,
      162, 163, 164, 165, 166, 186, 187, 188, 189, 190, 191, 355, 544, 213

    ]
    mazeCoords1.map( coord =>{
      cells[coord-1].classList.add('maze')
    })

    const cookieCoords1 = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
      41, 42, 43, 44, 45, 46, 47, 48, 49, 52, 57,62, 64, 69, 74, 82, 87, 89, 94,
      102, 107, 112, 113, 114, 119, 124, 127, 128, 129, 130, 131, 132, 133,
      134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149,
      152, 157, 159, 167, 169, 174, 177, 182, 184, 192, 194, 199, 202, 207, 209, 
      210, 211, 212, 214, 215, 216, 217, 219, 224, 227, 228, 229, 230, 231, 232, 
      244, 245, 246, 247, 248, 249, 257, 269, 282, 294, 307, 319, 332, 344, 357, 369,
      382, 394, 407, 419, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437,
      439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 452, 456, 462, 464, 470, 
      474, 478, 479, 481, 482, 483, 484, 485, 486, 487, 489, 490, 491, 492, 493, 
      494, 495, 497, 498, 504, 506, 508, 518, 520, 522, 527, 528, 529, 530, 531,
      533, 534, 535, 536, 537, 539, 540, 541, 542, 543, 545, 546, 547, 548, 549,
      552, 562, 564, 574, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 
      588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599
    ]

  // console.log(cookieCoords1.length)
    cookieCoords1.map( coord =>{
      cells[coord - 1].classList.add('cookie')
    })

    const pokeballCoords1 = [499, 477, 99, 77 ]
    pokeballCoords1.map( coord =>{
      cells[coord - 1].classList.add('pokeBall')
    })
  }
  // ---------------PLAYER MOVE WITH MAZE COLLISION DETECTION ---------------

  function handleKeyUp(event) {
    // sprite removal to simulate movement
    cells[playerPosition].classList.remove('sprite') 
    
    const x = playerPosition % width
    const y = Math.floor(playerPosition / width)
    //finding the solution below was more painful and arduous than I care to admit.
    if (event.keyCode === 39 || event.keyCode === 68) {
      if (x < width - 1 && !cells[playerPosition + 1].classList.contains('maze')){ //<-- preliminary avoidance tests
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
      if (y < width -1  && !cells[playerPosition + width].classList.contains('maze')) {
        playerPosition = playerPosition + width
      }
    } 
    //sprite reapplication in whatever position has been decided above
    cells[playerPosition].classList.add('sprite') 
    //check for and eat cookies, log points
    if (cells[playerPosition].classList.contains('cookie')){
      // console.log('cookie detected nom nom')
      cells[playerPosition].classList.remove('cookie')
      playerScore += 100
      cookiesRemaining -= 1
      if (cookiesRemaining === 0){
        console.log('YOU WIN')
      }
      console.log(playerScore)
    }
  }

  //---------- ENEMY TIMER ENEMY1--------
  
  function startTimer(){
    setInterval(()=>{ 
      // if class of enemy is afraid
      // flee function, else
      follow()
      follow2()
    }, 300)
  }

  //--- RANDOM MOVEMENT ENEMY 1 -- 

  function moveRandom (){ 
    cells[enemy1Position].classList.remove('enemy1')
    //declare variables needed for measurements
    const x = enemy1Position % width
    const y = Math.floor(enemy1Position / width)
    //create random number to choose path to come
    const randomDirection = Math.floor(Math.random() * 4)

    if (randomDirection === 0){
      if (x < width - 1 && !cells[enemy1Position - width].classList.contains('maze'))
      {enemy1Position = enemy1Position - width
      } 
      cells[enemy1Position].classList.add('enemy1')
    }   else if (randomDirection === 1){
      if (x > 0 && !cells[enemy1Position - 1].classList.contains('maze')) {
        enemy1Position = enemy1Position - 1 
      } 
      cells[enemy1Position].classList.add('enemy1')
    }   else if (randomDirection === 2) {
      if (y < width - 1  && !cells[enemy1Position + width].classList.contains('maze')) {
        enemy1Position = enemy1Position + width
      } 
      cells[enemy1Position].classList.add('enemy1')
    }   else if (randomDirection === 3){
      if (x < width - 1 && !cells[enemy1Position + 1].classList.contains('maze')){ 
        enemy1Position = enemy1Position + 1
      } 
      cells[enemy1Position].classList.add('enemy1')
    }
  }

  // ------------FOLLOW FUNCTION ------------
  function follow(){
    cells[enemy1Position].classList.remove('enemy1')

    const x = enemy1Position % width
    const y = Math.floor(enemy1Position / width)

    if (playerPosition > enemy1Position && playerPosition - enemy1Position < width)  {
      if (x < width - 1 && !cells[enemy1Position + 1].classList.contains('maze')){ 
        enemy1Position = enemy1Position + 1
        cells[enemy1Position].classList.add('enemy1')
      } else moveRandom()
    }   else if (playerPosition > enemy1Position){
      if (y < width - 1  && !cells[enemy1Position + width].classList.contains('maze')) {
        enemy1Position = enemy1Position + width
        cells[enemy1Position].classList.add('enemy1')
      } else moveRandom()
    }   else if (playerPosition < enemy1Position && enemy1Position - playerPosition < width) {
      if (x > 0 && !cells[enemy1Position - 1].classList.contains('maze')) {
        enemy1Position = enemy1Position - 1 
      } else moveRandom()
      cells[enemy1Position].classList.add('enemy1')
    }   else if (playerPosition < enemy1Position)  {
      if (x < width - 1 && !cells[enemy1Position - width].classList.contains('maze'))
      {enemy1Position = enemy1Position - width
      } else moveRandom()
      cells[enemy1Position].classList.add('enemy1')
    }
    cells[enemy1Position].classList.add('enemy1')
  }

  //------ ENEMY 2 -------

    
  function startTimer2(){
    setInterval(()=>{ 
      // if class of enemy is afraid
      // flee function, else
      follow2()
    }, 300)
  }

  //--- RANDOM MOVEMENT ENEMY 2 -- 

  function moveRandom2 (){ 
    cells[enemy2Position].classList.remove('enemy2')
    //declare variables needed for measurements
    const x = enemy2Position % width
    const y = Math.floor(enemy2Position / width)
    //create random number to choose path to come
    const randomDirection = Math.floor(Math.random() * 4)

    if (randomDirection === 0){
      if (x < width - 1 && !cells[enemy2Position - width].classList.contains('maze'))
      {enemy2Position = enemy2Position - width
      } 
      cells[enemy2Position].classList.add('enemy2')
    }   else if (randomDirection === 1){
      if (x > 0 && !cells[enemy2Position - 1].classList.contains('maze')) {
        enemy2Position = enemy2Position - 1 
      } 
      cells[enemy2Position].classList.add('enemy2')
    }   else if (randomDirection === 2) {
      if (y < width - 1  && !cells[enemy2Position + width].classList.contains('maze')) {
        enemy2Position = enemy2Position + width
      } 
      cells[enemy2Position].classList.add('enemy2')
    }   else if (randomDirection === 3){
      if (x < width - 1 && !cells[enemy2Position + 1].classList.contains('maze')){ 
        enemy2Position = enemy2Position + 1
      } 
      cells[enemy2Position].classList.add('enemy2')
    }
  }

  // ------------FOLLOW FUNCTION ------------
  function follow2(){
    cells[enemy2Position].classList.remove('enemy2')

    const x = enemy2Position % width
    const y = Math.floor(enemy2Position / width)

    if (playerPosition > enemy2Position && playerPosition - enemy2Position < width)  {
      if (x < width - 1 && !cells[enemy2Position + 1].classList.contains('maze')){ 
        enemy2Position = enemy2Position + 1
        cells[enemy2Position].classList.add('enemy2')
      } else moveRandom2()
    }   else if (playerPosition > enemy2Position){
      if (y < width - 1  && !cells[enemy2Position + width].classList.contains('maze')) {
        enemy2Position = enemy2Position + width
        cells[enemy2Position].classList.add('enemy2')
      } else moveRandom2()
    }   else if (playerPosition < enemy2Position && enemy2Position - playerPosition < width) {
      if (x > 0 && !cells[enemy2Position - 1].classList.contains('maze')) {
        enemy2Position = enemy2Position - 1 
      } else moveRandom2()
      cells[enemy2Position].classList.add('enemy2')
    }   else if (playerPosition < enemy2Position)  {
      if (x < width - 1 && !cells[enemy2Position - width].classList.contains('maze'))
      {enemy2Position = enemy2Position - width
      } else moveRandom2()
      cells[enemy2Position].classList.add('enemy2')
    }
    cells[enemy2Position].classList.add('enemy2')
  }


  //call the grid below so the cells exist
  createGrid(playerPosition)
  // call maze
  createMaze()
  //start enemy timer
  startTimer()
  

  // TO DO ------

  //run away function

  
  // * Event listeners
  document.addEventListener('keyup', handleKeyUp)
}

window.addEventListener('DOMContentLoaded', init)