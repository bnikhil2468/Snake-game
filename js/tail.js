class Tail {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {

        fill(tailColor);
        rect(this.x, this.y, gap, gap, 4);

    }
}