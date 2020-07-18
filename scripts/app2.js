function init() {

  // * game variables
  let playerPosition = document.querySelector("#\\34 88")
  playerPosition.classList.add('sprite')
  console.log(playerPosition)
  //create array that represents all the divs in the grid
  //then you can use playerPosition.id 


  function handleKeyUp(event) {
    // console.log('key pressed',event.keyCode)
    
    playerPosition.classList.remove('sprite') // * remove class from old position
    console.log(playerPosition)
    // // const x = pikaPosition % width
    // // const y = Math.floor(pikaPosition / width)

    switch (event.keyCode) { // * calculate the new index
      case 39: 
      console.log('key pressed',event.keyCode)
        playerPosition.id++
        console.log(playerPosition.id)
        break
      case 37:
        console.log('key pressed',event.keyCode)
    //     // playerPosition--
        break
      case 38:
        console.log('key pressed',event.keyCode)
    //     // playerPosition = playerPosition - 25
        break
      case 40:
        console.log('key pressed',event.keyCode)
    //     // playerPosition = playerPosition - 25
        break
      default:
        console.log('invalid key do nothing') 
    }

    playerPosition.classList.add('sprite') // * add the class back at the new position
  }

  // const grid = document.querySelector('.grid')
  // const cells = []
  // const width = 25
  // function createGrid() {
  //   for (let i = 0; i < gridCellCount; i++) {
  //     const cell = document.createElement('div')
  //     cells.push(cell)
  //     // cell.innerHTML = i
  //     grid.appendChild(cell)
  //   }
  // }

  // createGrid()

  // cells.innerHTML = 

  // * Event listeners
  document.addEventListener('keyup', handleKeyUp)

}
document.addEventListener('DOMContentLoaded', init)