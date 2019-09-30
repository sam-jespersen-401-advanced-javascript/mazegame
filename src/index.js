import Player from './Player.js';
import Maze from './Maze.js';
const gameContainer = document.getElementById('game-container');
const button = document.getElementById('button');
const playerContainer = document.getElementById('player-container');
const numberInput = document.getElementById('number');
const sizeInput = document.getElementById('size');
const speedInput = document.getElementById('speed');


//VARIABLES
let sizeOfCellInPx;
let lengthOfEachSideOfMaze;
let speed;
let maze;
let player;

const startX = 0;
const startY = 0;



button.addEventListener('click', () => {

  sizeOfCellInPx = Number(sizeInput.value);
  lengthOfEachSideOfMaze = Number(numberInput.value);
  speed = Number(speedInput.value);

  gameContainer.style.height = sizeOfCellInPx * lengthOfEachSideOfMaze;
  gameContainer.style.width = sizeOfCellInPx * lengthOfEachSideOfMaze;

  maze = new Maze(sizeOfCellInPx, lengthOfEachSideOfMaze);
  maze.renderCells();

  let x = Math.floor(Math.random() * lengthOfEachSideOfMaze);
  let y = Math.floor(Math.random() * lengthOfEachSideOfMaze);
  const start = `${x}/${y}`;

  maze.activeList.push(start);
  maze.seenList.push(start);

  const promise = new Promise((res, rej) => {
    res(maze.renderMaze(speed));
  });
  promise.then(() => {
    console.log('promise resolved');
    if(playerContainer.firstChild) {
      playerContainer.removeChild(playerContainer.firstChild);
    }

    player = new Player(startX, startY, sizeOfCellInPx, lengthOfEachSideOfMaze, maze.cellList);
    playerContainer.appendChild(player.render());
  });


  window.onkeydown = playerMove;

  function playerMove(e) {
    if(e.key === 'ArrowUp') {
      player.move('up');
    }
    if(e.key === 'ArrowDown') {
      player.move('down');
    }
    if(e.key === 'ArrowRight') {
      player.move('right');
    }
    if(e.key === 'ArrowLeft') {
      player.move('left');
    }

  }
});