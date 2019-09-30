const playerContainer = document.getElementById('player-container');
class Player {
  constructor(x, y, size, count, cells) {
    this.x = x;
    this.y = y;
    this.pos = `${this.x}/${this.y}`;
    this.containerSize = `${size * count}px`;
    this.cells = cells;
    this.size = size;
  }

  render() {
    playerContainer.style.height = this.containerSize;
    playerContainer.style.width = this.containerSize;
    const div = document.createElement('div');
    div.style.height = `${this.size}px`;
    div.style.width = `${this.size}px`;
    div.style.top = `${this.y * this.size}px`;
    div.style.left = `${this.x * this.size}px`;
    div.className = 'player';
    div.id = 'player';
    return div;
  }

  findCellById(id) {
    return this.cells.find(e => {
      return e.id === id;
    });
  }

  move(dir) {
    const player = document.getElementById('player');
    const cell = this.findCellById(this.pos);
    console.log(cell);
    const left = Number(player.style.left.split('p')[0]);
    const top = Number(player.style.top.split('p')[0]);

    if (dir === 'up' && cell.exits.indexOf('up') !== -1) {
      player.style.top = `${top - this.size}px`;
      this.y--;
    }
    if (dir === 'down' && cell.exits.indexOf('down') !== -1) {
      player.style.top = `${top + this.size}px`;
      this.y++;
    }
    if (dir === 'right' && cell.exits.indexOf('right') !== -1) {
      player.style.left = `${left + this.size}px`;
      this.x++;
    }
    if (dir === 'left' && cell.exits.indexOf('left') !== -1) {
      player.style.left = `${left - this.size}px`;
      this.x--;
    }
    this.pos = `${this.x}/${this.y}`;
    console.log(player.style.left, player.style.top);
    console.log(this.x, this.y);

  }


}

export default Player;