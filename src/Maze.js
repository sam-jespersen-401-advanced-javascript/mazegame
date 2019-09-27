import Cell from './Cell.js';
const container = document.getElementById('maze-container');

class Maze {
  constructor(cellSize, cellCount) {
    this.cellSize = cellSize;
    this.cellCount = cellCount * cellCount;
    this.cellList = [];
    this.seenList = [];
    this.activeList = [];

  }
  renderCells() {
    const index = Math.sqrt(this.cellCount);
    const containerSize = this.cellSize * index;
    container.style.width = `${containerSize}px`;
    container.style.height = `${containerSize}px`;
    for(let i = 0; i < index; i++) {
      for(let t = 0; t < index; t++) {
        const cell = new Cell(t, i, this.cellSize);
        this.cellList.push(cell);
        container.appendChild(cell.render());
      }
    }
  }

  makeMaze(speed) {
    if(this.activeList.length > 0) {

      let count = 0;
      setTimeout(() => {
        while(count <= speed) {

          if(this.activeList.length > 0) {
            let cellxy = this.activeList[this.activeList.length - 1];
            let newCoords = this.moveRandom(cellxy);

            if(!newCoords) {
              let lastCellxy = this.activeList.pop();
              let lastCell = this.findCellById(lastCellxy);
              lastCell.toggleActive();
              lastCell.toggleSeen();
              count++;

            } else {

              let newCell = this.findCellById(newCoords);
              this.activeList.push(newCoords);
              this.seenList.push(newCoords);
              newCell.toggleActive();

              let oldCell = this.findCellById(cellxy);
              oldCell.removeBorder(newCoords);
              count++;
            }
          }
        }

        let remainder = this.cellList.length - this.seenList.length;
        if(remainder < speed) {
          speed = remainder / 2;
        }
        this.makeMaze(speed);

      }, 1);
    }
  }

  moveRandom(cell) {
    let moves = [];
    let x = +cell.split('/')[0];
    let y = +cell.split('/')[1];

    if(y > 0) {
      let up = `${x}/${y - 1}`;
      this.seenList.indexOf(up) > -1 ? null : moves.push(up);
    }

    if(y < Math.sqrt(this.cellCount) - 1) {
      let down = `${x}/${y + 1}`;
      this.seenList.indexOf(down) > -1 ? null : moves.push(down);
    }

    if(x > 0) {
      let left = `${x - 1}/${y}`;
      this.seenList.indexOf(left) > -1 ? null : moves.push(left);
    }

    if(x < Math.sqrt(this.cellCount) - 1) {
      let right = `${x + 1}/${y}`;
      this.seenList.indexOf(right) > -1 ? null : moves.push(right);
    }

    if(!moves.length) { return null; }

    let random = Math.floor(Math.random() * moves.length);
    return moves[random];
  }

  findCellById(id) {
    return this.cellList.find(e => {
      return e.id === id;
    });
  }

  makeExitMap() {
    this.cellList.forEach(cell => {
      cell.makeExits();
    });

  }

}




export default Maze;