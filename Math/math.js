var board=null;
var tile_size = 100;

//initialize the game when page is on
$(document).ready(start);
console.log("listening5");

function start(){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  board = new Board(ctx);
	board.draw();
}


//create a rectangle box
var Rectangle = function(top, left, width, height) {
  this.top = top;
  this.left = left;
  this.width = width;
  this.height = height;
}

//build playboard
var Board = function(ctx) {
  ///<field name="ctx" type="CanvasRenderingContext2D" />
  this.ctx = ctx;
  this.border_width = 10;
  // this.counter = 0;
  // this.complete = false;
  // this.asked_for_help = false;
  // this.started = false;
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
}

Board.prototype.draw = function() {
  this.ctx.fillStyle = "#F8F1E5";
  this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  // this.drawBorder();
  // this.drawExit();
  for (var i in this.tiles) {
    this.tiles[i].draw();
  }

  // $('#counter').text("Moves: " + this.counter);
  // if (this.complete) {
  //   this.drawComplete();
  // }
}

var Tile = function(column, row, columns, rows, color) {
  this.row = row;
  this.column = column;
  this.rows = rows;
  this.columns = columns;
  this.size = tile_size;
  this.padding = 6;
  this.color = color;
  // this.get_me_out = (columns == rows & columns == 2);
}

Tile.prototype.draw = function() {
  board.ctx.shadowBlur = 10;
  board.ctx.shadowOffsetX = 5;
  board.ctx.shadowOffsetY = 5;
  board.ctx.shadowColor = "gray";
  board.ctx.fillStyle = this.color;
  board.ctx.fillRect(
    board.playing_surface.left + this.column * this.size + this.padding,
    board.playing_surface.top + this.row * this.size + this.padding,
    this.columns * this.size - this.padding * 2,
    this.rows * this.size - this.padding * 2);

  board.ctx.shadowColor = "transparent";
  board.ctx.strokeStyle = "black";
  board.ctx.lineWidth = 1;
  board.ctx.strokeRect(
    board.playing_surface.left + this.column * this.size + this.padding,
    board.playing_surface.top + this.row * this.size + this.padding,
    this.columns * this.size - this.padding * 2,
    this.rows * this.size - this.padding * 2);

  if (this.get_me_out && board.asked_for_help) {
    this.drawGetMeOut();
  }
}
