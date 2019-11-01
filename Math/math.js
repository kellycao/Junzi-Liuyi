var board = null;
var tile_size = 100;
var refresh_timer = null;
var mouse_down = false;
var mouse_position = null;

//initialize the game when page is on
$(document).ready(start);

function start(){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  board = new Board(ctx);
	board.draw();
  canvas.addEventListener("touchstart", onTouchStart, false);
  canvas.addEventListener("touchmove", onTouchMove, false);
  canvas.addEventListener("touchend", onTouchEnd, false);
}


//create a (width*height) rectangle at (x,y)
var Rectangle = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

//build playboard
var Board = function(ctx) {
  this.ctx = ctx;
  this.border_width = 7;
  this.counter = 0;
  this.complete = false;
  // this.asked_for_help = false; -->maybe later
  this.started = false;
  this.playing_surface = new Rectangle(
    this.border_width,
    this.border_width,
    this.ctx.width - 2 * this.border_width,
    this.ctx.height - 2 * this.border_width
  );
  this.tiles = [
    new Tile(0, 0, 1, 2, "#007ACC"),
    new Tile(1, 0, 2, 2, "#FF7D7D"),
    new Tile(3, 0, 1, 2, "#007ACC"),
    new Tile(1, 2, 2, 1, "#EBCAFE"),
    new Tile(0, 2, 1, 2, "#007ACC"),
    new Tile(1, 3, 1, 1, "#AAD1DA"),
    new Tile(0, 4, 1, 1, "#AAD1DA"),
    new Tile(2, 3, 1, 1, "#AAD1DA"),
    new Tile(3, 4, 1, 1, "#AAD1DA"),
    new Tile(3, 2, 1, 2, "#007ACC"),
  ];

  // attempts to make image tiles
  // this.tiles = [
  //   new Tile(0, 0, 1, 2, "/Math/images/zhangfei.jpg"),
  //   new Tile(1, 0, 2, 2, "/Math/images/caocao.png"),
  //   new Tile(3, 0, 1, 2, "/Math/images/machao.png"),
  //   new Tile(1, 2, 2, 1, "/Math/images/guanyu.png"),
  //   new Tile(0, 2, 1, 2, "/Math/images/huangzhong.png"),
  //   new Tile(1, 3, 1, 1, "/Math/images/zu.png"),
  //   new Tile(0, 4, 1, 1, "/Math/images/zu.png"),
  //   new Tile(2, 3, 1, 1, "/Math/images/zu.png"),
  //   new Tile(3, 4, 1, 1, "/Math/images/zu.png"),
  //   new Tile(3, 2, 1, 2, "/Math/images/zhaoyun.png"),
  // ];
}

Board.prototype.draw = function() {
  this.ctx.fillStyle = "#F8F1E5";
  this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  this.drawBorder();
  // this.drawExit();
  for (var i in this.tiles) {
    this.tiles[i].draw();
  }

  $('#counter').text("Moves: " + this.counter);
  if (this.complete) {
     this.drawComplete();
  }
}

var Tile = function(t_x, t_y, t_width, t_height, color) {
  this.t_x = t_x;
  this.t_y = t_y;
  this.t_height = t_height;
  this.t_width = t_width;
  this.size = tile_size;
  this.padding = 6;
  this.color = color;
  // this.get_me_out = (t_width == t_height & t_width == 2);


  //attempts to make image tile
  // this.image = new Image();
  // this.image.onload = function(){
  //   this.ImageReady = true;
  //   console.log(this.image);
  // }
  // this.image.src = imageurl;

}

Tile.prototype.draw = function() {
  board.ctx.shadowBlur = 10;
  board.ctx.shadowOffsetX = 5;
  board.ctx.shadowOffsetY = 5;
  board.ctx.shadowColor = "gray";

  //attempts to make picture tile
  // board.ctx.drawImage(this.image,
  //       this.t_x, this.t_y,
  //       this.t_width, this.t_height);//display

  board.ctx.fillStyle = this.color;
  board.ctx.fillRect(
  board.playing_surface.x + this.t_x * this.size + this.padding,
  board.playing_surface.y + this.t_y * this.size + this.padding,
  this.t_width * this.size - this.padding * 2,
  this.t_height * this.size - this.padding * 2);

  board.ctx.shadowColor = "transparent";
  board.ctx.strokeStyle = "black";
  board.ctx.lineWidth = 1;
  board.ctx.strokeRect(
    board.playing_surface.x + this.t_x * this.size + this.padding,
    board.playing_surface.y + this.t_y * this.size + this.padding,
    this.t_width * this.size - this.padding * 2,
    this.t_height * this.size - this.padding * 2);

  // if (this.get_me_out && board.asked_for_help) {
  //   this.drawGetMeOut();
  // }

}

Board.prototype.drawBorder = function() {
  this.ctx.strokeStyle = "#78592D";
  this.ctx.lineWidth = this.border_width;
  this.ctx.lineCap = "round";

  var left = this.border_width / 2;
  var right = this.ctx.canvas.width - this.border_width / 2;
  var top = this.border_width / 2;
  var bottom = this.ctx.canvas.height - this.border_width / 2;

  this.ctx.beginPath();
  this.ctx.moveTo(left + tile_size, bottom);
  this.ctx.lineTo(left, bottom);
  this.ctx.lineTo(left, top);
  this.ctx.lineTo(right, top);
  this.ctx.lineTo(right, bottom);
  this.ctx.lineTo(right - tile_size, bottom);
  this.ctx.stroke();
}

Board.prototype.drawComplete = function() {
  this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

  this.ctx.shadowBlur = 10;
  this.ctx.shadowOffsetX = 5;
  this.ctx.shadowOffsetY = 5;
  this.ctx.shadowColor = "darkgreen";

  this.ctx.textBaseline = "middle";
  this.ctx.textAlign = "center";
  this.ctx.fillStyle = "limegreen";
  this.ctx.font = "88px 'Josefin Sans'";
  this.ctx.fillText("You did it!", this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
  this.ctx.shadowColor = "transparent";
}

var Point = function(x, y) {
  this.x = x;
  this.y = y;
}

var Direction = {
  left: "left",
  right: "right",
  up: "up",
  down: "down"
}

Board.prototype.makeMove = function(point, direction) {
  ///<param name="point" type "Point" />
  ///<param name="direction" type="Direction" />
  // normalize the point
  point.x -= this.ctx.canvas.offsetLeft;
  point.y -= this.ctx.canvas.offsetTop;
  for (var i in this.tiles) {
    if (this.tiles[i].containsPoint(point)) {
      this.moveTile(this.tiles[i], direction);
      this.draw();
      break;
    }
  }
}

Board.prototype.reportCompletion = function() {}

Board.prototype.reportStart = function() {}

Board.prototype.moveTile = function(tile, direction) {
  ///<param name="tile" type "Point" />
  ///<param name="direction" type="Direction" />
  if (!this.canMove(tile, direction)) {
    return;
  }

  this.counter++;

  if (!this.started) {
    this.started = true;
    this.reportStart();
  }

  switch (direction) {
    case Direction.left:
      tile.t_x--;
      break;
    case Direction.right:
      tile.t_x++;
      break;
    case Direction.up:
      tile.t_y--;
      break;
    case Direction.down:
      tile.t_y++;
      if (tile.get_me_out && tile.t_x == 1 && tile.t_y == 4) {
        this.complete = true;
        this.reportCompletion();
      }
      break;
  }
}


Board.prototype.canMove = function(tile, direction) {
  if (direction == Direction.left) {
    var left_t_x = tile.t_x - 1;
    if (left_t_x < 0) return false;

    for (var t_y = tile.t_y; t_y < tile.t_y + tile.t_height; t_y++) {
      if (this.isOccupied(left_t_x, t_y)) {
        return false;
      }
    }

    if (tile.get_me_out && tile.t_y > 3) {
      return false;
    }

    return true;
  } else if (direction == Direction.right) {
    var right_t_x = tile.t_x + tile.t_width;
    if (right_t_x > 3) return false;

    for (var t_y = tile.t_y; t_y < tile.t_y + tile.t_height; t_y++) {
      if (this.isOccupied(right_t_x, t_y)) {
        return false;
      }
    }

    if (tile.get_me_out && tile.t_y > 3) {
      return false;
    }

    return true;
  } else if (direction == Direction.up) {
    var up_t_y = tile.t_y - 1;
    if (up_t_y < 0) return false;

    for (var t_x = tile.t_x; t_x < tile.t_x + tile.t_width; t_x++) {
      if (this.isOccupied(t_x, up_t_y)) {
        return false;
      }
    }

    return true;
  } else if (direction == Direction.down) {
    var down_t_y = tile.t_y + tile.t_height;
    if (tile.get_me_out && tile.t_x == 1 && tile.t_y >= 3) {
      return true;
    } else if (down_t_y > 4) return false;

    for (var t_x = tile.t_x; t_x < tile.t_x + tile.t_width; t_x++) {
      if (this.isOccupied(t_x, down_t_y)) {
        return false;
      }
    }

    return true;
  }
}

Board.prototype.isOccupied = function(t_x, t_y) {
  ///<returns type="bool" />
  for (var i in this.tiles) {
    if (this.tiles[i].containst_xt_y(t_x, t_y)) {
      return true;
    }
  }

  return false;
}

Tile.prototype.containsPoint = function(point) {
  ///<param name="point" type="Point" />
  var left = board.playing_surface.x + this.t_x * this.size;
  var right = left + this.size * this.t_width;
  var top = board.playing_surface.y + this.t_y * this.size;
  var bottom = top + this.size * this.t_height;
  return left <= point.x && point.x <= right && top <= point.y && point.y <= bottom;
}

Tile.prototype.containst_xt_y = function(t_x, t_y) {
  var left = this.t_x <= t_x;
  var right = t_x <= this.t_x + this.t_width - 1;
  var top = this.t_y <= t_y;
  var bottom = t_y <= this.t_y + this.t_height - 1;
  return left && right && top && bottom;
}


function onMouseDown(event) {
  ///<param name="event" type="MouseEvent" />
  moveStart(event.x, event.y);
  event.preventDefault();
}

function onMouseUp(event) {
  moveEnd();
  event.preventDefault();
}

function onMouseMove(event) {
  move(event.x, event.y);
  event.preventDefault();
}

function onMouseOut(event) {
  moveEnd();
  event.preventDefault();
}

function onTouchStart(event) {
  ///<param name="event" type="TouchEvent" />
  var touch = event.touches[0];
  moveStart(touch.pageX, touch.pageY);
  event.preventDefault();
  return false;
}

function onTouchMove(event) {
  var touch = event.touches[0];
  move(touch.pageX, touch.pageY);
  event.preventDefault();
  return false;
}

function onTouchEnd(event) {
  moveEnd();
  event.preventDefault();
}

function moveStart(x, y) {
  mouse_down = true;
  mouse_position = new Point(x, y);
}

function move(x, y) {
  if (mouse_down && mouse_position && !board.complete) {
    // find direction
    var dx = x - mouse_position.x;
    var dy = y - mouse_position.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) < tile_size / 2) {
        // small movement
        return;
      }
      if (dx > 0) {
        // move to the right
        board.makeMove(mouse_position, Direction.right);
      } else if (dx < 0) {
        // move to the left
        board.makeMove(mouse_position, Direction.left);
      }
    } else if (Math.abs(dy) > Math.abs(dx)) {
      if (Math.abs(dy) < tile_size / 2) {
        // small movement
        return;
      }
      if (dy > 0) {
        // move down
        board.makeMove(mouse_position, Direction.down);
      } else if (dy < 0) {
        // move up
        board.makeMove(mouse_position, Direction.up);
      }
    }

    mouse_position.x = x;
    mouse_position.y = y;
  }
}

function moveEnd() {
  mouse_down = false;
  mouse_position = null;
}
