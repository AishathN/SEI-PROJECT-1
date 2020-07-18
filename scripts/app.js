function init() {

  // * game variables
  let playerPosition = document.querySelector("#\\34 88")
  player = playerPosition.id
  playerPosition.classList.add('sprite')

  //player position = grid id

  function handleKeyUp(event) {
    console.log('key pressed',event.keyCode)
    
    // playerPosition.classList.remove('sprite') // * remove pika class from old position
    // // const x = pikaPosition % width
    // // const y = Math.floor(pikaPosition / width)

    // switch (event.keyCode) { // * calculate the new index
    //   case 39: 
    //   console.log('key pressed')
    //     // playerPosition++
    //     break
    //   case 37:
    //     // playerPosition--
    //     break
    //   case 38:
    //     // playerPosition = playerPosition - 25
    //     break
    //   case 40:
    //     // playerPosition = playerPosition - 25
    //     break
    //   default:
    //     console.log('invalid key do nothing') 
    // }

    // playerPosition.classList.add('sprite') // * add the class back at the new position
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