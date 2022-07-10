class Fruit {

    constructor() {
        this.x = floor(random(0, width) / gap) * gap;
        this.y = floor(random(0, height) / gap) * gap;
    }

    eat() {

        this.x = floor(random(0, width) / gap) * gap;
        this.y = floor(random(0, height) / gap) * gap;

        if (this.x == snake.x || this.y == snake.y) {
            this.eat();
        }
    }

    show() {
        fill("#FFA50C");
        rect(this.x, this.y, gap, gap, 4);
    }

}