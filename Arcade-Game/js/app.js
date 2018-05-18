
/* Adjust the Enemy speed...if You want. */
/* default enemy entry speed */
var entrySpeed = 450;

/* adjustSpeed = 10 -> 100 % enemy speed */
var adjustSpeed = 10;

var win = 0;
var failed = 0;
var result;

bar = new RGraph.Bar({
    id: 'canvas',
    data: [10],
    options: {
        adjustable: true
    }
}).draw();

bar.canvas.onclick = function(event) {
  var ca  = event.target;
  var obj = ca.__object__;
  
  /* 0.1 <= obj.data <= 10  */
  adjustSpeed = obj.data;
  return adjustSpeed;
}

// Enemies our player must avoid
var Enemy = function(x, y, entrySpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.entrySpeed = entrySpeed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.entrySpeed*adjustSpeed/10 * dt;
    if (this.x >= 500) {
      this.x = -100;
      this.entrySpeed = Math.floor(Math.random() * entrySpeed);
      if (this.entrySpeed < 150){
        this.entrySpeed = 150;
      }
    }

    if (player.x < this.x + 60 &&
        player.x + 40 > this.x &&
        player.y < this.y + 30 &&
        30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
        failed++;
        resultOutput(win, failed);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // Prevent player from moving beyond canvas wall boundaries
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        win++;
        resultOutput(win, failed);
        this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
  /* Simpler, faster than the IF. This is important in a game. */
  switch (keyPress) {
    case 'left' :
      this.x -= 101;
    break;
    case 'up' :
      this.y -= this.speed + 30;
    break;
    case 'right' :
      this.x += 101;
    break;
    case 'down' :
      this.y += 80;
    break;
  }
};

Player.prototype.reset = function () {
    this.x = 200;
    this.y = 380;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var enemyStat = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

enemyStat.forEach(function(posY) {
    var newEnemySpeed = Math.floor(Math.random() * 450);
    if (newEnemySpeed < 150){
      newEnemySpeed = 150;
    }
    enemy = new Enemy(0, posY, newEnemySpeed);
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function resultOutput() {
document.querySelector("#counter").innerHTML = "Succeeded : "+ win + " Failed : " + failed;
}

function exitGameFunction(){
  if (confirm('Are you sure you want to exit?')) {
      // Exit
      close();
  } else {
      // Do nothing!
      return true;
  }  
}
