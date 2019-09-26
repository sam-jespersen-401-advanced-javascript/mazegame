const container = document.getElementById('maze-container');
const button = document.getElementById('button');
const exitsButton = document.getElementById('exits');

let count = 1;
for (let i = 0; i < 16; i++) {
  for (let t = 0; t < 16; t++) {

    const sq = document.createElement('div');
    sq.id = count;
    sq.className = 'sq';

    if (i === 0) {
      sq.classList.add('top');
    }
    if (i === 15) {
      sq.classList.add('bottom');
    }
    if (t === 0) {
      sq.classList.add('left');
    }
    if (t === 15) {
      sq.classList.add('right');
    }

    container.appendChild(sq);
    count++;
  }
}

const moveSet = {
  up: -16,
  down: 16,
  left: -1,
  right: 1
};

let cellList = [];
let visited = [];


function makeMaze() {
  setTimeout(() => {

    if (cellList.length > 0) {
      let cell = cellList[cellList.length - 1];
      let dir = moveRandom(cell);
      let move = moveSet[dir];

      if (dir === 0) {
        let lastCell = cellList.pop();
        document.getElementById(lastCell).classList.add('visited');
        document.getElementById(lastCell).classList.remove('highlight');

      } else {

        let newCell = cell + move;
        cellList.push(newCell);
        visited.push(newCell);
        document.getElementById(newCell).classList.add('highlight');
        removeBorders(cell, dir);
      }
      makeMaze();
    }
  }, 10);
}


function moveRandom(cell) {

  let moves = [];
  if (visited.indexOf(cell + 1) === -1 && !getBorder(cell).includes('right')) {
    moves.push('right');
  }
  if (visited.indexOf(cell - 1) === -1 && !getBorder(cell).includes('left')) {
    moves.push('left');
  }
  if (visited.indexOf(cell + 16) === -1 && !getBorder(cell).includes('bottom')) {
    moves.push('down');
  }
  if (visited.indexOf(cell - 16) === -1 && !getBorder(cell).includes('top')) {
    moves.push('up');
  }
  if (!moves.length) { return 0; }
  let random = Math.floor(Math.random() * moves.length);
  return moves[random];
}

function getBorder(cell) {
  return document.getElementById(cell).className;
}

function removeBorders(cell, dir) {
  if (dir === 'up') {
    document.getElementById(cell).style.borderTop = 'none';
    document.getElementById(cell - 16).style.borderBottom = 'none';
  }
  if (dir === 'down') {
    document.getElementById(cell).style.borderBottom = 'none';
    document.getElementById(cell + 16).style.borderTop = 'none';
  }
  if (dir === 'left') {
    document.getElementById(cell).style.borderLeft = 'none';
    document.getElementById(cell - 1).style.borderRight = 'none';
  }
  if (dir === 'right') {
    document.getElementById(cell).style.borderRight = 'none';
    document.getElementById(cell + 1).style.borderLeft = 'none';
  }
}


function makeExitMap() {
  let exitMap = {};
  for (let i = 1; i < 257; i++) {
    let elem = document.getElementById(i);
    let exits = [];
    if (elem.style.borderTop === 'none') {
      exits.push('top');
    }
    if (elem.style.borderBottom === 'none') {
      exits.push('bottom');
    }
    if (elem.style.borderLeft === 'none') {
      exits.push('left');
    }
    if (elem.style.borderRight === 'none') {
      exits.push('right');
    }
    let key = `e${i}`;
    exitMap[key] = exits;
  }
  return exitMap;
}


button.addEventListener('click', () => {
  let start = Math.floor(Math.random() * 256) + 1;
  cellList.push(start);
  visited.push(start);
  document.getElementById(start).classList.add('highlight');

  makeMaze();
});

let exits;

exitsButton.addEventListener('click', () => {
  exits = makeExitMap();
  document.getElementById(1).classList.add('player');
  document.getElementById(256).classList.add('goal');

});

let playerPosition = 1;

document.onkeydown = playerMove;

function playerMove(e) {
  if (e.key === 'ArrowUp') {
    let move = -16;
    let index = `e${playerPosition}`;
    if (exits[index].indexOf('top') !== -1) {
      document.getElementById(playerPosition).classList.remove('player');
      document.getElementById(playerPosition + move).classList.add('player');

      playerPosition += move;
    }
  }
  else if (e.key === 'ArrowDown') {
    let move = 16;
    let index = `e${playerPosition}`;

    if (exits[index].indexOf('bottom') !== -1) {

      document.getElementById(playerPosition).classList.remove('player');
      document.getElementById(playerPosition + move).classList.add('player');

      playerPosition += move;
    }
  }
  else if (e.key === 'ArrowLeft') {
    let move = -1;
    let index = `e${playerPosition}`;

    if (exits[index].indexOf('left') !== -1) {

      document.getElementById(playerPosition).classList.remove('player');
      document.getElementById(playerPosition + move).classList.add('player');

      playerPosition += move;
    }
  }
  else if (e.key === 'ArrowRight') {
    let move = 1;
    let index = `e${playerPosition}`;

    if (exits[index].indexOf('right') !== -1) {

      document.getElementById(playerPosition).classList.remove('player');
      document.getElementById(playerPosition + move).classList.add('player');

      playerPosition += move;
    }
  }

  if (playerPosition === 256) {

  }

}