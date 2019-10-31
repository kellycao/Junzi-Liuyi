/*
 * First stab at Klotski
 *
 * TODO:
 * - refactor movement to use DFS
 * - add solver using BFS
 * - improve aesthetics: mouse hover highlight, etc
 */

"use strict";


/**
 * Represents a game of Klotski
 * @param Object canvas   the canvas to render the blocks on
 * @param Object ctx      the canvas context object
 * @param int    gridSize the size of the grid
 */
const Klotski = function (canvas, ctx, gridSize) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.gridSize = gridSize;
  this.movable = true;
  this.init();
};

/**
 * Initializes a new Klotski game
 * @param Array board  an optional Klotski board
 * @param Array blocks an optional set of Klotski blocks
 */
Klotski.prototype.init = function (board, blocks) {
  this.blocks = blocks || [
    new Block(0, 0, 2, 1, "hsl(0, 70%, 60%)"),
    new Block(1, 0, 2, 2, "hsl(200, 70%, 60%)"),
    new Block(3, 0, 2, 1, "hsl(0, 70%, 60%)"),
    new Block(0, 2, 2, 1, "hsl(0, 70%, 60%)"),
    new Block(1, 2, 1, 2, "hsl(50, 70%, 60%)"),
    new Block(3, 2, 2, 1, "hsl(0, 70%, 60%)"),
    new Block(1, 3, 1, 1, "hsl(100, 70%, 60%)"),
    new Block(2, 3, 1, 1, "hsl(100, 70%, 60%)"),
    new Block(0, 4, 1, 1, "hsl(100, 70%, 60%)"),
    new Block(3, 4, 1, 1, "hsl(100, 70%, 60%)")
  ];
  this.board = board || [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1]
  ];
};

/**
 * Renders the current position on canvas with
 * optional support for an animating block.
 * @param Block  movingBlock if present, block will be drawn
 *                           based on currPoint param
 * @param Object currPoint   overrides the x/y coordinates
 *                           of the moving block
 */
Klotski.prototype.render = function (movingBlock, currPoint) {
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  ctx.fillStyle = "#f1f1f1";

  ctx.fillRect(
    this.gridSize / 2,
    this.gridSize / 2,
    this.canvas.width - this.gridSize,
    this.canvas.height - this.gridSize
  );

  ctx.fillRect(
    this.gridSize,
    this.canvas.height - this.gridSize / 2 - 10,
    this.canvas.width - this.gridSize * 2,
    this.canvas.height
  );

  this.blocks.forEach(e => {
    if (!movingBlock || e.x !== movingBlock.x ||
        e.y !== movingBlock.y) {
      e.draw(this.ctx, this.gridSize);
    }
    else {
      e.draw(
        this.ctx, this.gridSize,
        currPoint.x, currPoint.y
      );
    }
  });
};

/**
 * Animates a block moving on the grid
 * @param Block  src   the source block
 * @param Object dest  the destination point
 */
Klotski.prototype.animate = function (src, dest) {
  const me = this;
  me.movable = false;
  const currPoint = { x: src.x, y: src.y };

  (function render() {
    me.render(src, currPoint);

    const distX = dest.x - currPoint.x;
    const distY = dest.y - currPoint.y;

    currPoint.x += distX * 0.3;
    currPoint.y += distY * 0.3;

    if (Math.abs(distX) >= 0.01 ||
      Math.abs(distY) >= 0.01) {
      requestAnimationFrame(render);
    }
    else {
      me.render();
      me.movable = true;
    }
  })();
};

/**
 * Returns the cardinal neighbors of a grid point
 * @param int x  the x block point
 * @param int y  the y block point
 * @return Object the nsew keyed object
 */
Klotski.prototype.getNeighbors = function (x, y) {
  return {
    n: this.findBlock(x, y - 1),
    s: this.findBlock(x, y + 1),
    e: this.findBlock(x + 1, y),
    w: this.findBlock(x - 1, y)
  };
};

/**
 * Returns whether a coordinate point is in bounds of the board
 * @param number x  the x coordinate
 * @param number y  the y coordinate
 * @return true if in bounds, false otherwise
 */
Klotski.prototype.isInBounds = function (x, y) {
  return x > this.gridSize / 2 &&
         y > this.gridSize / 2 &&
         x < this.canvas.width - this.gridSize / 2 &&
         y < this.canvas.height - this.gridSize / 2;
};

/**
 * Converts coordinate point to board indices
 * @param  Object point  the point to convert
 * @return Object point  the board index x/y pair
 */
Klotski.prototype.coordsToIdx = function (point) {
  return {
    x: (point.x - this.gridSize / 2) / this.gridSize | 0,
    y: (point.y - this.gridSize / 2) / this.gridSize | 0
  };
};

/**
 * Moves a block from a coordinate point to another
 * coordinate point if possible.
 * @param Object from  the origin x/y coordinate pair
 * @param Object to    the destination x/y coordinate pair
 * @return true if the move was successful, false otherwise
 */
Klotski.prototype.move = function (from, to, animate) {

  // Convert parameter coordinates to grid indices
  const origin = this.coordsToIdx(from);
  const dest = this.coordsToIdx(to);

  // Gather necessary blocks
  const source = this.findBlock(origin.x, origin.y);
  const neighbors = this.getNeighbors(dest.x, dest.y);

  // Check for a win--the 2x2 block exiting the bottom of the screen
  if (source.h === 2 && source.w === 2 &&
      source.x === 1 && source.y === 3 &&
      to.y > canvas.height - gridSize / 2) {
    if (dest.x === 2) { dest.x = 1; }
    this.animate(source, dest);
    source.x = dest.x;
    source.y = dest.y;
    setTimeout(() => {
      this.init();
      this.render();
    }, 3000);
    return true;
  }

  // Fail if no source block present, board is not movable,
  // no destination point, or move is out of bounds
  if (!source || !this.movable || !dest ||
      !this.isInBounds(to.x, to.y)) {
    return false;
  }

  // Compute the distance between the source and destination
  const dist = {
    x: dest.x - source.x,
    y: dest.y - source.y
  };

  // Validate and adjust destination based on direction of move
  if (dist.x < 0 && dist.y === 0) {      // left
    for (let i = dest.x; i < source.x; i++) {
      if (this.board[source.y][i] === 1) {
        return false;
      }
    }
  }
  else if (dist.x > 0 && dist.y === 0) { // right
    for (let i = source.x + source.w; i <= dest.x; i++) {
      if (this.board[source.y][i] === 1) {
        return false;
      }
    }

    dest.x -= source.w - 1;
  }
  else if (dist.y > 0 && dist.x === 0) { // down
    for (let i = source.y + source.h; i <= dest.y; i++) {
      if (this.board[i][source.x] === 1) {
        return false;
      }
    }

    dest.y -= source.h - 1;
  }
  else if (dist.y < 0 && dist.x === 0) { // up
    for (let i = dest.y; i < source.y; i++) {
      if (this.board[i][source.x] === 1) {
        return false;
      }
    }
  }
  else if (source.w === 2 && dist.x === 1 &&
           dist.y <= -1 && !neighbors.w) { // up and right
    dest.x--;
  }
  else if (source.w === 2 && dist.x === 1 &&
           dist.y >= 1 && !neighbors.w) {  // down and right
    dest.y -= source.h - 1;
    dest.x--;
  }
  else if (source.h === 2 && dist.x <= -1 &&
           dist.y === 1 && !neighbors.n) { // right and up
    dest.y--;
  }
  else if (source.h === 2 && dist.x >= 1 &&
           dist.y >= 1 && !neighbors.n) {  //  right and down
    dest.x -= source.w - 1;
    dest.y--;
  }
  else {
    return false;
  }

  // Copy the current board
  const newBoard = this.board.map(e => e.slice(0));

  // Clear the source block from the board
  for (let i = 0; i < source.h; i++) {
    for (let j = 0; j < source.w; j++) {
      newBoard[source.y+i][source.x+j] = 0;
    }
  }

  // Check for collisions at the block's destination
  for (let i = 0; i < source.h; i++) {
    for (let j = 0; j < source.w; j++) {
      if (newBoard[dest.y+i] === undefined ||
          newBoard[dest.y+i][dest.x+j] === undefined ||
          newBoard[dest.y+i][dest.x+j] >= 1) {
        return false;
      }

      newBoard[dest.y+i][dest.x+j] = 1;
    }
  }

  // Update board and source block and run animation
  if (animate) { this.animate(source, dest); }
  this.board = newBoard;
  source.x = dest.x;
  source.y = dest.y;
  return true;
};

/**
 * Finds the block on the board at
 * the parameter coordinate point.
 * @param number x  the x coordinate point
 * @param number y  the y coordinate point
 * @return Block if found, undefined otherwise
 */
Klotski.prototype.findBlock = function (x, y) {
  for (let i = 0; i < this.blocks.length; i++) {
    const e = this.blocks[i];

    for (let j = 0; j < e.h; j++) {
      for (let k = 0; k < e.w; k++) {
        if (e.x + k === x && e.y + j === y) {
          return this.blocks[i];
        }
      }
    }
  }
};


/**
 * Represents a block
 * @param int x         the x location of the block
 * @param int y         the y location of the block
 * @param int h         the height of the block
 * @param int w         the width of the block
 * @param string color  the color of the block
 */
const Block = function (x, y, h, w, color) {
  this.x = x;
  this.y = y;
  this.h = h;
  this.w = w;
  this.color = color;
};

Block.prototype.draw = function (ctx, gridSize, x, y) {
  if (x === undefined || y === undefined) {
    x = this.x;
    y = this.y;
  }

  ctx.fillStyle = this.color;
  ctx.strokeStyle = "#333";
  ctx.lineWidth = gridSize / 20;
  ctx.fillRect(
    gridSize / 2 + x * gridSize,
    gridSize / 2 + y * gridSize,
    this.w * gridSize,
    this.h * gridSize
  );
  ctx.strokeRect(
    gridSize / 2 + x * gridSize,
    gridSize / 2 + y * gridSize,
    this.w * gridSize,
    this.h * gridSize
  );
};


/**
 * Represents a mouse
 * @param elem the element to add listeners to
 */
const Mouse = function (elem) {
  this.x = 0;
  this.y = 0;
  this.clickX = 0;
  this.clickY = 0;
  this.pressed = false;

  elem.addEventListener("mousedown", e => {
    const boundingRect = elem.getBoundingClientRect();
    this.x = this.clickX = e.pageX - boundingRect.x;
    this.y = this.clickY = e.pageY - boundingRect.y;
    this.pressed = true;
    elem.style.cursor = "pointer"; // TODO: make grabbing hand
  });

  elem.addEventListener("mousemove", e => {
    if (this.pressed) {
      const canvasRect = elem.getBoundingClientRect();
      this.x = e.pageX - canvasRect.x;
      this.y = e.pageY - canvasRect.y;
    }
  });

  elem.addEventListener("mouseup", e => {
    this.pressed = false;
    klotski.move(
      { x: this.clickX, y: this.clickY },
      { x: this.x, y: this.y },
      true
    );
    klotski.render();
    elem.style.cursor = "default";
  });
};


if (window.CP) { CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000; }

// Set body CSS
document.body.style.margin = 0;
document.body.style.height = "99vh";
document.body.style.background = "#f1f1f1";
document.body.style.display = "flex";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";

// Create canvas and grid constants
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
let minBody = Math.min(parseInt(getComputedStyle(document.body).width),
                       parseInt(getComputedStyle(document.body).height));
const gridSize = minBody / 9;
canvas.width = minBody / 1.8;
canvas.height = minBody / 1.5;
document.body.appendChild(canvas);
const mouse = new Mouse(canvas);
const klotski = new Klotski(canvas, ctx, gridSize);
klotski.render();

const resizeHandler = e => {
  minBody = Math.min(parseInt(getComputedStyle(document.body).width),
                     parseInt(getComputedStyle(document.body).height));
  canvas.width = minBody / 1.8;
  canvas.height = minBody / 1.5;
  klotski.gridSize = minBody / 9;
  klotski.render();
};
let timeout;

window.addEventListener("resize", e => {
  timeout = setTimeout(resizeHandler, 300);
});
