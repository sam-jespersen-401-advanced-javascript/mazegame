class Player {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    render() {
        const div = document.createElement('div')
        div.style.className = 'player'
        div.style.height = `${this.size}px`
        div.style.width = `${this.size}px`
        div.style.top = this.y;
        div.style.left = this.x;
        return div;
    }

}

export default Player