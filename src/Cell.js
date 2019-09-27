class Cell {
  constructor(x, y, cellSize) {
    this.x = x;
    this.y = y;
    this.cellSize = cellSize;
    this.id = `${this.x}/${this.y}`;
    this.active = false;
    this.seen = false;
    this.exits = [];

  }
  render() {
    const div = document.createElement('div');
    div.id = this.id;
    div.className = 'sq';
    div.style.height = `${this.cellSize}px`;
    div.style.width = `${this.cellSize}px`;
    return div;
  }
  on() {
    document.getElementById(this.id).classList.add('player');
  }
  off() {
    document.getElementById(this.id).classList.remove('player');
  }

  toggleActive() {
    if(!this.active) {
      this.active = true;
      document.getElementById(this.id).classList.add('active');
    } else {
      this.active = false;
      document.getElementById(this.id).classList.remove('active');
    }
  }

  toggleSeen() {
    if(!this.seen) {
      this.seen = true;
      document.getElementById(this.id).classList.add('seen');
    } else {
      this.seen = false;
      document.getElementById(this.id).classList.remove('seen');
    }
  }

  removeBorder(coords) {
    const newX = coords.split('/')[0];
    const newY = coords.split('/')[1];

    if(newX > this.x) {
      document.getElementById(this.id).style.borderRight = 'none';
      document.getElementById(`${this.x + 1}/${this.y}`).style.borderLeft = 'none';
    }
    if(newX < this.x) {
      document.getElementById(this.id).style.borderLeft = 'none';
      document.getElementById(`${this.x - 1}/${this.y}`).style.borderRight = 'none';

    }
    if(newY > this.y) {
      document.getElementById(this.id).style.borderBottom = 'none';
      document.getElementById(`${this.x}/${this.y + 1}`).style.borderTop = 'none';

    }
    if(newY < this.y) {
      document.getElementById(this.id).style.borderTop = 'none';
      document.getElementById(`${this.x}/${this.y - 1}`).style.borderBottom = 'none';

    }
  }

  makeExits() {
    if(document.getElementById(this.id).style.borderRight === 'none') this.exits.push('right');
    if(document.getElementById(this.id).style.borderLeft === 'none') this.exits.push('left');
    if(document.getElementById(this.id).style.borderTop === 'none') this.exits.push('up');
    if(document.getElementById(this.id).style.borderBottom === 'none') this.exits.push('down');
  }

}

export default Cell;