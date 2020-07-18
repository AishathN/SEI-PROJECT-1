function init() {
  // * Dom Elements
  const grid = document.querySelector('.grid')
  const cells = []

  // * grid variables
  const width = 4
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
    cells[startingPosition].classList.add('sprite')
  }
  function handleKeyUp(event) {
    
    cells[playerPosition].classList.remove('sprite') 
    // * remove sprite class from old position
    const x = playerPosition % width
    const y = Math.floor(playerPosition / width)

    let calcUp = playerPosition + 1
    let calcDown = playerPosition - 1
    let case37 = playerPosition -= width
    let case38 = playerPosition += width
    let cellup = null
    let celldown = null
    let cellright = null
    let cellleft = null
    
    console.log(calcUp)
    if (calcUp < 16){
      cellright = cells[calcUp].classList.contains('maze')
    }
    if (calcDown > 0) {
    cellleft = cells[calcDown].classList.contains('maze')
    }
    if (case37 > 0) {
      cellup = cells[case37].classList.contains('maze')
      }
    celldown = cells[case38].classList.contains('maze')
    console.log(celldown)

    console.log(case38, case37, calcUp, calcDown) // <-- testing calculations
    console.log(cells[playerPosition])
    if (event.keyCode === 39) {
      if (x < width - 1 && calcUp !== 5){ //<-- preliminary avoidance tests
        playerPosition = playerPosition + 1 
      }
    }   
    else if (event.keyCode === 37) {
      if (x > 0 && calcDown !== 5) {
        playerPosition = playerPosition - 1 
      }    
    }
    else if (event.keyCode === 38) {
      if (y > 0 && !cellup) {
        playerPosition = playerPosition - width
      }
    }
    else if (event.keyCode === 40) {
      if (y < width - 1 && !celldown) {
        console.log(y)
        console.log(!celldown)
        playerPosition = playerPosition + width
      }
    } 

    cells[playerPosition].classList.add('sprite') 
    // * add the class back at the new position

  }
  
  //call the grid below so the cells exist
  createGrid(playerPosition)

  cells[7].classList.add('maze') //<-- works because now the grid exists
  // TO DO ------
  //create function that loops through an array of numbers representing 
  //cell IDs and assigns the class of maze to them. The cells do not have an array
  //or container so use their index to specify and keep within a certain length.

  //TO DO find out how to specify the class of a div being one you don't move into

 
  // * Event listeners
  document.addEventListener('keyup', handleKeyUp)
}

window.addEventListener('DOMContentLoaded', init)