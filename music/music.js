// //get canvas
// var cvs = document.getElementById("canvas");
// var ctx = cvs.getContext("2d");
// //load images
// var set = new Image();
// var i1 = new Image();
// var i2 = new Image();
// var i3 = new Image();
// var i4 = new Image();
// var i5 = new Image();
// var i6 = new Image();
// var i7 = new Image();
// var i8 = new Image();
// var i9 = new Image();
// var i10 = new Image();
// var i11 = new Image();
// var i12 = new Image();
// var i13 = new Image();
// var i14 = new Image();
// var i15 = new Image();
// set.src = "/music/images/set.jpg";
// i1.src = "/music/images/1.png";
// i2.src = "/music/images/2.png";
// i3.src = "/music/images/3.png";
// i4.src = "/music/images/4.png";
// i5.src = "/music/images/5.png";
// i6.src = "/music/images/6.png";
// i7.src = "/music/images/7.png";
// i8.src = "/music/images/8.png";
// i9.src = "/music/images/9.png";
// i10.src = "/music/images/10.png";
// i11.src = "/music/images/11.png";
// i12.src = "/music/images/12.png";
// i13.src = "/music/images/13.png";
// i14.src = "/music/images/14.png";
// i15.src = "/music/images/15.png";
//
// //onclick --> image gets larger effect
//
//

//load instruments sound track
// let sounds=[];
//js
// sounds[0] = new Audio();//place holder
// sounds[1] = new Audio('/music/audio/1.mp3');
// sounds[2] = new Audio('/music/audio/2.mp3');
// sounds[3] = new Audio('/music/audio/3.mp3');
// sounds[4] = new Audio('/music/audio/4.mp3');
// sounds[5] = new Audio('/music/audio/5.mp3');
// sounds[6] = new Audio('/music/audio/6.mp3');
// sounds[7] = new Audio('/music/audio/7.mp3');
// sounds[8] = new Audio('/music/audio/8.mp3');
// sounds[9] = new Audio('/music/audio/9.mp3');
// sounds[10] = new Audio('/music/audio/10.mp3');
// sounds[11] = new Audio('/music/audio/11.mp3');
// sounds[12] = new Audio('/music/audio/12.mp3');
// sounds[13] = new Audio('/music/audio/13.mp3');
// sounds[14] = new Audio('/music/audio/14.mp3');
// sounds[15] = new Audio('/music/audio/15.mp3');

//p5
new p5();
let sounds=[];
function preload(){

  sounds[0];//place holder
  sounds[1] = loadSound('/music/audio/1.mp3');
  sounds[2] = loadSound('/music/audio/2.mp3');
  sounds[3] = loadSound('/music/audio/3.mp3');
  sounds[4] = loadSound('/music/audio/4.mp3');
  sounds[5] = loadSound('/music/audio/5.mp3');
  sounds[6] = loadSound('/music/audio/6.mp3');
  sounds[7] = loadSound('/music/audio/7.mp3');
  sounds[8] = loadSound('/music/audio/8.mp3');
  sounds[9] = loadSound('/music/audio/9.mp3');
  sounds[10] = loadSound('/music/audio/10.mp3');
  sounds[11] = loadSound('/music/audio/11.mp3');
  sounds[12] = loadSound('/music/audio/12.mp3');
  sounds[13] = loadSound('/music/audio/13.mp3');
  sounds[14] = loadSound('/music/audio/14.mp3');
  sounds[15] = loadSound('/music/audio/15.mp3');
}

preload();


//
let ins = [];
ins[0] = document.getElementById("ins1"); //place hodler
ins[1] = document.getElementById("ins1");
ins[2] = document.getElementById("ins2");
ins[3] = document.getElementById("ins3");
ins[4] = document.getElementById("ins4");
ins[5] = document.getElementById("ins5");
ins[6] = document.getElementById("ins6");
ins[7] = document.getElementById("ins7");
ins[8] = document.getElementById("ins8");
ins[9] = document.getElementById("ins9");
ins[10] = document.getElementById("ins10");
ins[11] = document.getElementById("ins11");
ins[12] = document.getElementById("ins12");
ins[13] = document.getElementById("ins13");
ins[14] = document.getElementById("ins14");
ins[15] = document.getElementById("ins15");

//play instrument
function p1(){
  sounds[1].playMode('restart');
  sounds[1].play();
}
function p2(){
  sounds[2].playMode('restart');
  sounds[2].play();
}
function p3(){
  sounds[3].playMode('restart');
  sounds[3].play();
}
function p4(){
  sounds[4].playMode('restart');
  sounds[4].play();
}
function p55(){
  sounds[5].playMode('restart');
  sounds[5].play();
}
function p6(){
  sounds[6].playMode('restart');
  sounds[6].play();
}
function p7(){
  sounds[7].playMode('restart');
  sounds[7].play();
}
function p8(){
  sounds[8].playMode('restart');
  sounds[8].play();
}
function p9(){
  sounds[9].playMode('restart');
  sounds[9].play();
}
function p10(){
  sounds[10].playMode('restart');
  sounds[10].play();
}
function p11(){
  sounds[11].playMode('restart');
  sounds[11].play();
}
function p12(){
  sounds[12].playMode('restart');
  sounds[12].play();
}
function p13(){
  sounds[13].playMode('restart');
  sounds[13].play();
}
function p14(){
  sounds[14].playMode('restart');
  sounds[14].play();
}
function p15(){
  sounds[15].playMode('restart');
  sounds[15].play();
}


// ins[1].addEventListener("onclick", sounds[1].play());
 document.getElementById("ins1").addEventListener("click", p1);
 document.getElementById("ins2").addEventListener("click", p2);
 document.getElementById("ins3").addEventListener("click", p3);
 document.getElementById("ins4").addEventListener("click", p4);
 document.getElementById("ins5").addEventListener("click", p55);
 document.getElementById("ins6").addEventListener("click", p6);
 document.getElementById("ins7").addEventListener("click", p7);
 document.getElementById("ins8").addEventListener("click", p8);
 document.getElementById("ins9").addEventListener("click", p9);
 document.getElementById("ins10").addEventListener("click", p10);
 document.getElementById("ins11").addEventListener("click", p11);
 document.getElementById("ins12").addEventListener("click", p12);
 document.getElementById("ins13").addEventListener("click", p13);
 document.getElementById("ins14").addEventListener("click", p14);
 document.getElementById("ins15").addEventListener("click", p15);

//play with keyboard
function keyPressed(){
  // console.log("hello");
  if (keyCode === 65) {
    p1();
  } else if (keyCode === 87){
    p2();
  } else if (keyCode === 82){
    p3();
  } else if (keyCode === 84){
    p4();
  } else if (keyCode === 89){
    p55();
  } else if (keyCode === 85){
    p6();
  } else if (keyCode === 73){
    p7();
  } else if (keyCode === 79){
    p8();
  } else if (keyCode === 76){
    p9();
  } else if (keyCode === 68){
    p10();
  } else if (keyCode === 70){
    p11();
  } else if (keyCode === 71){
    p12();
  } else if (keyCode === 72){
    p13();
  } else if (keyCode === 74){
    p14();
  } else if (keyCode === 32){
    p15();
  }
}

// document.getElementById("ins1").onclick=function(){sounds[1].play();};
//make the instrument clickable.
// for (var i=1; i<=ins.length; i++){
//   ins[i].addEventListener("click", sounds[i].play());
// }

function showkeybtn(){
  var x = document.getElementsByClassName('keys');
  if (x[0].style.display === "none") {
    for (var i=0;i<x.length;i+=1){
  x[i].style.display = 'inline';
  console.log("hello");
}
  } else {
    for (var i=0;i<x.length;i+=1){
  x[i].style.display = 'none';
}
  }
}








//
