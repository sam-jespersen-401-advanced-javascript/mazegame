import Player from './Player.js';
import Maze from './Maze.js';
const gameContainer = document.getElementById('game-container');
const button = document.getElementById('button');
const playButton = document.getElementById('play');
const playerContainer = document.getElementById('player-container');


//VARIABLES
const sizeOfCellInPx = 20;
const lengthOfEachSideOfMaze = 20;

const speed = 60;
const startX = 0;
const startY = 0;

newGame(sizeOfCellInPx, lengthOfEachSideOfMaze);



//FUNCTIONS

function newGame(cellSize, cellCount) {
  const maze = new Maze(cellSize, cellCount);
  const player = new Player(startX, startY, cellSize, cellCount, maze.cellList);

  gameContainer.style.height = cellSize * cellCount;
  gameContainer.style.width = cellSize * cellCount;

  maze.renderCells();

  button.addEventListener('click', () => {

    let x = Math.floor(Math.random() * cellCount);
    let y = Math.floor(Math.random() * cellCount);
    const start = `${x}/${y}`;
    maze.activeList.push(start);
    maze.seenList.push(start);

    maze.makeMaze(speed);

  });

  playButton.addEventListener('click', () => {
    maze.makeExitMap();
    playerContainer.appendChild(player.render());
  });



  window.onkeydown = playerMove;

  function playerMove(e) {
    if (e.key === 'ArrowUp') {
      player.move('up');
    }
    if (e.key === 'ArrowDown') {
      player.move('down');
    }
    if (e.key === 'ArrowRight') {
      player.move('right');
    }
    if (e.key === 'ArrowLeft') {
      player.move('left');
    }

  }

}