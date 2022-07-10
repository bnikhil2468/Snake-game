let apple;
let gap = 20; //gap between grid lines
let snake;
let pLoc = {};
let highest = 0;
var l_boundry, r_boundry, t_boundry, b_boundry;
let game_over = new Audio('assets/game_over.mp3');
let eat = new Audio('assets/eat.mp3');
let ding = new Audio('assets/coin.mp3')
let e = 9
let m = 12
let h = 17
var START = 0
var PLAY = 1
var END = 2
var gameState = START
var gameMode = 1
var headColor = "#00a11d"
var tailColor = "#57b533"
//var backgroundImg = 

function setup() {
  createCanvas(700, 700);
  snake = new Head();
  apple = new Fruit();
  
  textSize(15);
  textStyle(BOLD);

  for (let i = 0; i < 2; i++) {
    snake.tails.push(new Tail(snake.x, snake.y + (15 * i)));
    
  }
}

function draw() {
  background("#4a515e");
  if (gameState === START) {
    fill("#ff9900")
    textSize(15);
    textStyle(BOLD)
    text("PRESS SPACE TO START", width / 2 - 90, height / 2 - 50)
    text("PRESS 1 FOR EASY MODE, 2 FOR NORMAL, OR 3 FOR HARD MODE", width / 2 - 240, height / 2 - 80)
    text("RED:R, GREEN:G, BLUE:B",width / 2 - 100, height / 2 - 110 )

    if (keyDown("r")) {
      headColor="#FF2D00"
      tailColor="#FF6949"
    }
    if (keyDown("g")) {
      headColor="#00a11d"
      tailColor="#57b533"
    }
    if (keyDown("b")) {
      headColor="#0C75FF"
      tailColor="#57A0FF"
    }

  
    if (keyDown("SPACE")) {
      gameState = PLAY
    }
    if (keyDown("1")) {
      frameRate(e);
    }
    if (keyDown("2")) {
      frameRate(m);
    }
    if (keyDown("3")) {
      frameRate(h);
    }
    
  }
  else if (gameState === PLAY) {


    noFill();
    noStroke();
    for (let i = 0; i < height; i += gap) {
      for (let j = 0; j < width; j += gap) {

        rect(j, i, gap, gap);

      }
    }

    for (let i = snake.tails.length - 1; i >= 0; i--) {
      if (i == 0) {
        snake.tails[i].x = snake.x;
        snake.tails[i].y = snake.y;
      } else {
        snake.tails[i].x = snake.tails[i - 1].x;
        snake.tails[i].y = snake.tails[i - 1].y;
      }
      snake.tails[i].show();
    }

    pLoc.x = snake.x;
    pLoc.y = snake.y;
    snake.update();

    if (snake.collision(apple)) {
      eat.play();
      snake.score++;
      apple.eat();
      snake.tails.push(new Tail(pLoc.x, pLoc.y));
    }
    if (snake.score > highest) {
      highest = snake.score;
      ding.play();

    }
    if (snake.collision(apple) == false || snake.tail_collide() == true) {
      gameState = END
      game_over.play();

    }

    apple.show();
  }

  else if (gameState === END) {
    gameOver()
    //if (keyDown("r")) {
      //restart();
    //}
  }
  fill("#ff9900");
  text("Score: " + int(snake.score), 10, height - 25);
  text("Highest: " + int(highest), 10, height - 10);
  snake.show();
  noFill();
  strokeWeight(4);
  stroke(43, 51, 25);
  rect(1, 1, width - 2, height - 2);


}




function keyPressed() {
  if (keyCode == LEFT_ARROW || keyCode == 65 && snake.dir != 'right') {
    snake.dir = 'left';
  } else if (keyCode == RIGHT_ARROW || keyCode == 68 && snake.dir != 'left') {
    snake.dir = 'right';
  } else if (keyCode == UP_ARROW || keyCode == 87 && snake.dir != 'down') {
    snake.dir = 'up';
  } else if (keyCode == DOWN_ARROW || keyCode == 83 && snake.dir != 'up') {
    snake.dir = 'down';
  }
}

function gameOver() {
  swal({
    title: `Game Over`,
    text: `SCORE:${snake.score}${"\n"}HIGH SCORE:${highest}`,
    //imageUrl:
    //"https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    //imageSize: "100x100",
    confirmButtonText: "PLAY AGAIN"
  },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
        restart();
      }
    }
  );


}

function restart() {
  gameState = START
  snake.redefine();
  apple.eat();
  score = 0
}