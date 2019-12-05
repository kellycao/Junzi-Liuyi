//get canvas
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


//load images
var rider = new Image();
var bg = new Image();
var cloud = new Image();

rider.src = "Ride/images/rider.png";
bg.src = "Ride/images/bg.jpg";
cloud.src = "Ride/images/cloud.png";

//constants
//locagtions
var riderx = 400;
var ridery = cvs.height - 370;
var cloudx = 200;
var cloudy = 355;
var ground = 75;
//other settings
var gravity = 1.5;
var score = 0;


function jump() {
  // if(rider<=(cvs.height-ground-rider.height-150)){
  ridery -= 100;
}
document.addEventListener("keydown", jump);

//cloud coordinates
var clouds = [];
clouds[0] = {
  x: 400,
  y: cloudy
}



function start() {
  ctx.drawImage(bg, 0, 0, 1300, 512);
  for (var i = 0; i < clouds.length; i++) {
    ctx.drawImage(cloud, clouds[i].x, cloudy, 200, 75);
    clouds[i].x--;
    if (clouds[i].x == 399) {
      clouds.push({
        x: 400 + Math.floor(Math.random() * 600),
        y: cloudy
      });
    }

    //detect stand
    if ((clouds[i].x < riderx + rider.width) && (riderx < clouds[i].x + cloud.width) && (ridery + rider.height > clouds[i].y + cloud.height)) {
      // on key down
      // document.addEventListener("keydown", jump);

    }
    //detect falling
    else if (ridery + rider.height > clouds[i].y + cloud.height) {

      //game over.
      // gameover();
    } else {
      event.preventDefault();
    }

    if (clouds[i].x == 380) {
      score++;
    }
    ctx.fillStyle = "#000";
    ctx.font = "25px Ma Shan Zheng";
    ctx.fillText("得分: " + score, 10, 35);

  }

  ctx.drawImage(rider, riderx, ridery, 200, 200);
  ridery += gravity;
  requestAnimationFrame(start);
}

function gameover() {
  location.reload();

}
start();









//space helper
