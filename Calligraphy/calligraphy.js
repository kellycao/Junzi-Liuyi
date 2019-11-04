//canvas size
var canvasWidth = 450;
var canvasHeight = canvasWidth;
//draw grid

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = canvasWidth;
canvas.height = canvasHeight;

function Drawgrid() {
  context.save();
  context.strokeStyle = "red";
  //outside
  context.beginPath()
  context.moveTo(0, 0)
  context.lineTo(canvasWidth, 0)
  context.lineTo(canvasWidth, canvasHeight)
  context.lineTo(0, canvasHeight)
  context.closePath()
  context.lineWidth = 7
  context.stroke()

  //inside
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(canvasWidth, canvasHeight);

  context.moveTo(canvasWidth, 0);
  context.lineTo(0, canvasHeight);

  context.moveTo(canvasWidth / 2, 0);
  context.lineTo(canvasWidth / 2, canvasHeight);


  context.moveTo(0, canvasHeight / 2);
  context.lineTo(canvasWidth, canvasHeight / 2);


  context.lineWidth = 1;

  context.stroke();
  context.restore();
}

Drawgrid();



//colorboard width
var colorboard = document.getElementById("controller");
colorboard.style.width = canvasWidth + "px";


//clear canvas
var clearButton = document.getElementById("clear_btn");
clearButton.onclick = function() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  Drawgrid();
}


//color option
var colorButton = document.getElementsByClassName("color_btn");
var i = 0;
var ButtonColor;
var strokeColor = "black";

function clickColor(i) {
  colorButton[i].onclick = function() {
    for (j = 0; j < colorButton.length; j++) {
      colorButton[j].classList.remove("color_btn_selected");
    }
    this.classList.add("color_btn_selected");
    ButtonColor = window.getComputedStyle(colorButton[i], "null");
    strokeColor = ButtonColor.backgroundColor;
  }
}

for (var i = 0; i < colorButton.length; i++) {
  clickColor(i);
}


//mouse initial
var isMouseDown = false;


//last mouse location and time
var lasloc = {
  x: 0,
  y: 0
};
var lasTimeStamp = 0;
var lasLineWidth = -1;




Drawgrid();

//canvas xy position
function windowToCanvas(x, y) {
  var canvasBox = canvas.getBoundingClientRect();
  return {
    x: Math.round(x - canvasBox.left),
    y: Math.round(y - canvasBox.top)
  }
}


function beginStroke(point) {
  isMouseDown = true;
  lasloc = windowToCanvas(point.x, point.y);
  lasTimeStamp = new Date().getTime();
}

function endStroke(point) {
  isMouseDown = false;
}

function moveStroke(point) {
  var curloc = windowToCanvas(point.x, point.y);
  var curTimeStamp = new Date().getTime();

  //speed = distance / time
  var s = calDistance(curloc, lasloc);
  var t = curTimeStamp - lasTimeStamp;
  var lineWidth = calLineWidth(t, s);

  //begin path
  context.beginPath();
  context.moveTo(lasloc.x, lasloc.y);
  context.lineTo(curloc.x, curloc.y);
  context.strokeStyle = strokeColor;
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.stroke();

  //linear
  lasloc = curloc;
  lasTimeStamp = curTimeStamp;
  lasLineWidth = ResultLineWidth;
}

function calDistance(loc1, loc2) {
  return Math.sqrt((loc1.x - loc2.x) * (loc1.x - loc2.x) + (loc1.y - loc2.y) * (loc1.y - loc2.y));
}

//faster and thinner
var maxLineWidth = 20;
var minLineWidth = 1;
var maxLineSpeed = 10;
var minLineSpeed = 0.1;

function calLineWidth(t, s) {
  var v = s / t;
  var ResultLineWidth;
  //speed boundary
  if (v <= minLineSpeed) {
    ResultLineWidth = maxLineWidth;
  } else if (v >= maxLineSpeed) {
    ResultLineWidth = minLineWidth;
  } else {
    ResultLineWidth = maxLineWidth - (v - minLineSpeed) / (maxLineSpeed - minLineSpeed) * (maxLineWidth - minLineWidth);
  }

  if (lasLineWidth == -1) {
    return ResultLineWidth;
  }
}


//mouse control
canvas.onmousedown = function(e) {
  e.preventDefault();
  beginStroke({
    x: e.clientX,
    y: e.clientY
  });
}

canvas.onmouseup = function(e) {
  e.preventDefault();
  endStroke();
}

canvas.onmouseout = function(e) {
  e.preventDefault();
  endStroke();
}

canvas.onmousemove = function(e) {
  e.preventDefault();
  if (isMouseDown) {
    moveStroke({
      x: e.clientX,
      y: e.clientY
    });
  }
}
