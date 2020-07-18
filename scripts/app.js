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
    cells[3].classList.add('maze')
  }
  

  function handleKeyUp(event) {
    
    cells[playerPosition].classList.remove('sprite') // * remove sprite class from old position
    const x = playerPosition % width
    const y = Math.floor(playerPosition / width)

    //rewrite below as an if else statement that identifies the cell ID it should not be going in as well
    // eg if cellID !included in array
    let calcUp = playerPosition + 1
    let calcDown = playerPosition - 1
    let case37 = playerPosition -= width
    let case38 = playerPosition += width

    console.log(case38, case37, calcUp, calcDown)

    if (event.keyCode === 39) {
      if (x < width - 1 && calcUp !== 5){
        playerPosition = playerPosition +1 
        console.log(playerPosition)
        // cells[playerPosition].classList.add('sprite')
      }
    }   
    else if (event.keyCode === 37) {
      if (x > 0 && calcDown !== 5) {
        playerPosition = playerPosition - 1 
        console.log(playerPosition)
        // cells[playerPosition].classList.add('sprite')
      }    
    }
    else if (event.keyCode === 38) {
      if (y > 0 && case37 !== 5) {
        playerPosition = playerPosition - width
        console.log(playerPosition)
        // cells[playerPosition].classList.add('sprite')
      }
    }
    else if (event.keyCode === 40) {
      if (y < width - 1 && case38 !== 5) {
        playerPosition = playerPosition + width
        console.log(playerPosition)
        // cells[playerPosition].classList.add('sprite')
      }
    } 

    cells[playerPosition].classList.add('sprite') // * add the class back at the new position
  
  }

  createGrid(playerPosition)

  // * Event listeners
  document.addEventListener('keyup', handleKeyUp)
}

window.addEventListener('DOMContentLoaded', init)