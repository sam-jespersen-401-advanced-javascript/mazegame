import Cell from './Cell.js'
import Player from './Player.js'
import Maze from './Maze.js'
const container = document.getElementById('maze-container');
const button = document.getElementById('button');
const exitsButton = document.getElementById('exits');


const maze = new Maze(15, 1024)
maze.renderCells()

button.addEventListener('click', () => {

  let x = Math.floor(Math.random() * Math.sqrt(maze.cellCount));
  let y = Math.floor(Math.random() * Math.sqrt(maze.cellCount));
  const start = `${x}/${y}`;
  maze.activeList.push(start)
  maze.seenList.push(start)


  maze.makeMaze();
})



// function makeExitMap() {
//   let exitMap = {};
//   for (let i = 1; i < 257; i++) {
//     let elem = document.getElementById(i);
//     let exits = [];
//     if (elem.style.borderTop === 'none') {
//       exits.push('top');
//     }
//     if (elem.style.borderBottom === 'none') {
//       exits.push('bottom');
//     }
//     if (elem.style.borderLeft === 'none') {
//       exits.push('left');
//     }
//     if (elem.style.borderRight === 'none') {
//       exits.push('right');
//     }
//     let key = `e${i}`;
//     exitMap[key] = exits;
//   }
//   return exitMap;
// }



// let exits;

// exitsButton.addEventListener('click', () => {
//   exits = makeExitMap();
//   document.getElementById(1).classList.add('player');
//   document.getElementById(256).classList.add('goal');

// });

// let playerPosition = 1;

// document.onkeydown = playerMove;

// function playerMove(e) {
//   if (e.key === 'ArrowUp') {
//     let move = -16;
//     let index = `e${playerPosition}`;
//     if (exits[index].indexOf('top') !== -1) {
//       document.getElementById(playerPosition).classList.remove('player');
//       document.getElementById(playerPosition + move).classList.add('player');

//       playerPosition += move;
//     }
//   }
//   else if (e.key === 'ArrowDown') {
//     let move = 16;
//     let index = `e${playerPosition}`;

//     if (exits[index].indexOf('bottom') !== -1) {

//       document.getElementById(playerPosition).classList.remove('player');
//       document.getElementById(playerPosition + move).classList.add('player');

//       playerPosition += move;
//     }
//   }
//   else if (e.key === 'ArrowLeft') {
//     let move = -1;
//     let index = `e${playerPosition}`;

//     if (exits[index].indexOf('left') !== -1) {

//       document.getElementById(playerPosition).classList.remove('player');
//       document.getElementById(playerPosition + move).classList.add('player');

//       playerPosition += move;
//     }
//   }
//   else if (e.key === 'ArrowRight') {
//     let move = 1;
//     let index = `e${playerPosition}`;

//     if (exits[index].indexOf('right') !== -1) {

//       document.getElementById(playerPosition).classList.remove('player');
//       document.getElementById(playerPosition + move).classList.add('player');

//       playerPosition += move;
//     }
//   }

//   if (playerPosition === 256) {

//   }

// }