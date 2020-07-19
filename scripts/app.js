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
  let cookieCount = 0


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
    cells[428].classList.add('cookie')
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
      272, 273, 274, 252, 253, 254, 255, 256, 281, 306, 295, 302, 289, 290, 291, 285,
      286, 287, 310, 335, 302, 303, 304, 305, 320, 321, 322, 323, 324, 352, 353, 354, 
      356, 381, 402, 403, 404, 405, 406, 370, 371, 372, 373, 374, 395, 420, 421, 422, 
      423, 424, 234, 235, 236, 240, 241, 242, 310, 335, 360, 361, 362, 363, 364, 365,
      366, 316, 341, 453, 454, 455, 480, 505, 457, 458, 459, 460, 461, 507, 532, 471, 
      472, 473, 496, 521, 519, 538, 563, 465, 466, 467, 468, 509, 510, 511, 
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
  }

  // ---------------CHARACTER MOVE WITH MAZE COLLISION DETECTION ---------------
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
      console.log(playerScore)
    }
  }
  
  //call the grid below so the cells exist
  createGrid(playerPosition)

 
  createMaze()
  // TO DO ------

  //populate cookies function, attach to game start, let cookiecount
  //keep track so when cookies === 0 you win.

 
  // * Event listeners
  document.addEventListener('keyup', handleKeyUp)
}

window.addEventListener('DOMContentLoaded', init)