function init() {
  // * Dom Elements
  const grid = document.querySelector('.grid')
  const cells = []

  // * grid variables
  const width = 25
  const cellCount = width * width

  // * game variables
  let playerPosition = 0


  //this creates the grid and assigns pikachu to the top left.
  function createGrid(startingPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      // cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    cells[startingPosition+width+1].classList.add('sprite')
  }
  function handleKeyUp(event) {
    
    cells[playerPosition].classList.remove('sprite') 
    // * remove sprite class from old position
    const x = playerPosition % width
    const y = Math.floor(playerPosition / width)
    //finding the solution below was more painful and arduous than I care to admit.
    if (event.keyCode === 39) {
      if (x < width - 1 && !cells[playerPosition + 1].classList.contains('maze')){ //<-- preliminary avoidance tests
        playerPosition = playerPosition + 1 
      }
    } else if (event.keyCode === 37) {
      if (x > 0 && !cells[playerPosition - 1].classList.contains('maze')) {
        playerPosition = playerPosition - 1 
      }    
    } else if (event.keyCode === 38) {
      if (y > 0 && !cells[playerPosition - width].classList.contains('maze')) {
        playerPosition = playerPosition - width
      }
    } else if (event.keyCode === 40) {
      if (y < width -1  && !cells[playerPosition + width].classList.contains('maze')) {
        playerPosition = playerPosition + width
      }
    } 

    cells[playerPosition].classList.add('sprite') 
    // * add the class back at the new position
  }
  
  //call the grid below so the cells exist
  createGrid(playerPosition)

  function createMaze(){
    const mazeCoords1 = 
    [53,54,55,78,103,104,105,106,81,56,63,88,58,59,60,61,86,111,108,109,110,
      83,65, 66, 67, 68, 70, 71, 72, 73, 90, 93, 95, 98, 115, 116, 117, 118, 
      120, 121, 122, 123, 153, 154, 155, 156, 203, 204, 205, 206,178, 181, 170,
      171, 172, 173, 198, 195, 220, 221, 222, 223, 410, 411, 412, 413, 414, 415, 416,
      438, 463, 358, 383, 408, 368, 393, 418, 318, 308, 553, 554, 555, 556, 557, 558,
      559, 560, 561, 565, 566, 567, 568, 569, 570, 571, 572, 573, 523, 524
    ]
    mazeCoords1.map( coord =>{
      cells[coord].classList.add('maze')
    })
  }
  createMaze()
  // TO DO ------


  //create function that loops through an array of numbers representing 
  //cell IDs and assigns the class of maze to them. The cells do not have an array
  //or container so use their index to specify and keep within a certain length.
 
  // * Event listeners
  document.addEventListener('keyup', handleKeyUp)
}

window.addEventListener('DOMContentLoaded', init)