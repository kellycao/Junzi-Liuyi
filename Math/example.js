
var tile_size = 100;
var box = null;
var refresh_timer = null;
var mouse_down = false;
var mouse_position = null;

$(document).ready(start);

function start() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  box = new Box(ctx);
  box.draw();
  canvas.addEventListener("touchstart", onTouchStart, false);
  canvas.addEventListener("touchmove", onTouchMove, false);
  canvas.addEventListener("touchend", onTouchEnd, false);
}

function help() {
  $('#help-text').slideToggle();
  box.asked_for_help = true;
  box.draw();
}

var Point = function(x, y) {
  this.x = x;
  this.y = y;
}

var Rectangle = function(top, left, width, height) {
  this.top = top;
  this.left = left;
  this.width = width;
  this.height = height;
}

var Direction = {
  left: "left",
  right: "right",
  up: "up",
  down: "down"
}

var Box = function(ctx) {
  ///<field name="ctx" type="CanvasRenderingContext2D" />
  this.ctx = ctx;
  this.border_width = 10;
  this.counter = 0;
  this.complete = false;
  this.asked_for_help = false;
  this.started = false;
  this.playing_surface = new Rectangle(
    this.border_width,
    this.border_width,
    this.ctx.width - 2 * this.border_width,
    this.ctx.height - 2 * this.border_width);

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
}

Box.prototype.draw = function() {
  this.ctx.fillStyle = "#FBF9EC";
  this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  this.drawBorder();
  this.drawExit();
  for (var i in this.tiles) {
    this.tiles[i].draw();
  }

  $('#counter').text("Moves: " + this.counter);
  if (this.complete) {
    this.drawComplete();
  }
}

Box.prototype.drawExit = function() {
  this.ctx.shadowBlur = 10;
  this.ctx.shadowOffsetX = 2;
  this.ctx.shadowOffsetY = 2;
  this.ctx.shadowColor = "gray";

  this.ctx.textBaseline = "bottom";
  this.ctx.textAlign = "center";
  this.ctx.fillStyle = "gray";
  this.ctx.font = "30px 'Josefin Sans'";
  this.ctx.fillText("EXIT", this.ctx.canvas.width / 2, this.ctx.canvas.height);
  this.ctx.shadowColor = "transparent";
}

Box.prototype.drawComplete = function() {
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

Box.prototype.drawBorder = function() {
  this.ctx.strokeStyle = "gray";
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

Box.prototype.makeMove = function(point, direction) {
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

Box.prototype.moveTile = function(tile, direction) {
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
      tile.column--;
      break;
    case Direction.right:
      tile.column++;
      break;
    case Direction.up:
      tile.row--;
      break;
    case Direction.down:
      tile.row++;
      if (tile.get_me_out && tile.column == 1 && tile.row == 4) {
        this.complete = true;
        this.reportCompletion();
      }
      break;
  }
}

Box.prototype.reportCompletion = function() {}

Box.prototype.reportStart = function() {}

Box.prototype.canMove = function(tile, direction) {
  if (direction == Direction.left) {
    var left_column = tile.column - 1;
    if (left_column < 0) return false;

    for (var row = tile.row; row < tile.row + tile.rows; row++) {
      if (this.isOccupied(left_column, row)) {
        return false;
      }
    }

    if (tile.get_me_out && tile.row > 3) {
      return false;
    }

    return true;
  } else if (direction == Direction.right) {
    var right_column = tile.column + tile.columns;
    if (right_column > 3) return false;

    for (var row = tile.row; row < tile.row + tile.rows; row++) {
      if (this.isOccupied(right_column, row)) {
        return false;
      }
    }

    if (tile.get_me_out && tile.row > 3) {
      return false;
    }

    return true;
  } else if (direction == Direction.up) {
    var up_row = tile.row - 1;
    if (up_row < 0) return false;

    for (var column = tile.column; column < tile.column + tile.columns; column++) {
      if (this.isOccupied(column, up_row)) {
        return false;
      }
    }

    return true;
  } else if (direction == Direction.down) {
    var down_row = tile.row + tile.rows;
    if (tile.get_me_out && tile.column == 1 && tile.row >= 3) {
      return true;
    } else if (down_row > 4) return false;

    for (var column = tile.column; column < tile.column + tile.columns; column++) {
      if (this.isOccupied(column, down_row)) {
        return false;
      }
    }

    return true;
  }
}

Box.prototype.isOccupied = function(column, row) {
  ///<returns type="bool" />
  for (var i in this.tiles) {
    if (this.tiles[i].containsColumnRow(column, row)) {
      return true;
    }
  }

  return false;
}

var Tile = function(column, row, columns, rows, color) {
  this.row = row;
  this.column = column;
  this.rows = rows;
  this.columns = columns;
  this.size = tile_size;
  this.padding = 6;
  this.color = color;
  this.get_me_out = (columns == rows & columns == 2);
}

Tile.prototype.draw = function() {
  box.ctx.shadowBlur = 10;
  box.ctx.shadowOffsetX = 5;
  box.ctx.shadowOffsetY = 5;
  box.ctx.shadowColor = "gray";
  box.ctx.fillStyle = this.color;
  box.ctx.fillRect(
    box.playing_surface.left + this.column * this.size + this.padding,
    box.playing_surface.top + this.row * this.size + this.padding,
    this.columns * this.size - this.padding * 2,
    this.rows * this.size - this.padding * 2);

  box.ctx.shadowColor = "transparent";
  box.ctx.strokeStyle = "black";
  box.ctx.lineWidth = 1;
  box.ctx.strokeRect(
    box.playing_surface.left + this.column * this.size + this.padding,
    box.playing_surface.top + this.row * this.size + this.padding,
    this.columns * this.size - this.padding * 2,
    this.rows * this.size - this.padding * 2);

  if (this.get_me_out && box.asked_for_help) {
    this.drawGetMeOut();
  }
}

Tile.prototype.drawGetMeOut = function() {
  box.ctx.shadowBlur = 15;
  box.ctx.shadowOffsetX = 2;
  box.ctx.shadowOffsetY = 2;
  box.ctx.shadowColor = "gray";

  box.ctx.textBaseline = "middle";
  box.ctx.textAlign = "center";
  box.ctx.fillStyle = "maroon";
  box.ctx.font = "32px 'Josefin Sans'";
  box.ctx.fillText(
    "Get Me Out",
    box.playing_surface.left + this.column * this.size + this.columns * this.size / 2,
    box.playing_surface.top + this.row * this.size + this.rows * this.size / 2);
  box.ctx.shadowColor = "transparent";
}

Tile.prototype.containsPoint = function(point) {
  ///<param name="point" type="Point" />
  var left = box.playing_surface.left + this.column * this.size;
  var right = left + this.size * this.columns;
  var top = box.playing_surface.top + this.row * this.size;
  var bottom = top + this.size * this.rows;
  return left <= point.x && point.x <= right && top <= point.y && point.y <= bottom;
}

Tile.prototype.containsColumnRow = function(column, row) {
  var left = this.column <= column;
  var right = column <= this.column + this.columns - 1;
  var top = this.row <= row;
  var bottom = row <= this.row + this.rows - 1;
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
  if (mouse_down && mouse_position && !box.complete) {
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
        box.makeMove(mouse_position, Direction.right);
      } else if (dx < 0) {
        // move to the left
        box.makeMove(mouse_position, Direction.left);
      }
    } else if (Math.abs(dy) > Math.abs(dx)) {
      if (Math.abs(dy) < tile_size / 2) {
        // small movement
        return;
      }
      if (dy > 0) {
        // move down
        box.makeMove(mouse_position, Direction.down);
      } else if (dy < 0) {
        // move up
        box.makeMove(mouse_position, Direction.up);
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
