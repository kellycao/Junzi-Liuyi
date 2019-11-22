
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
  ins[1].style.transition = 'transform .2s';
  ins[1].style.transform = 'scale(1.2)';
  sounds[1].playMode('restart');
  sounds[1].play();
  setTimeout(function(){ins[1].style.transform = 'scale(1)'; }, 200);
}
function p2(){
  ins[2].style.transition = 'transform .2s';
  ins[2].style.transform = 'scale(1.2)';
  sounds[2].playMode('restart');
  sounds[2].play();
  setTimeout(function(){ins[2].style.transform = 'scale(1)'; }, 200);
}
function p3(){
  ins[3].style.transition = 'transform .2s';
  ins[3].style.transform = 'scale(1.2)';
  sounds[3].playMode('restart');
  sounds[3].play();
  setTimeout(function(){ins[3].style.transform = 'scale(1)'; }, 200);
}
function p4(){
  ins[4].style.transition = 'transform .2s';
  ins[4].style.transform = 'scale(1.2)';
  sounds[4].playMode('restart');
  sounds[4].play();
  setTimeout(function(){ins[4].style.transform = 'scale(1)'; }, 200);
}
function p55(){
  ins[5].style.transition = 'transform .2s';
  ins[5].style.transform = 'scale(1.2)';
  sounds[5].playMode('restart');
  sounds[5].play();
  setTimeout(function(){ins[5].style.transform = 'scale(1)'; }, 200);
}
function p6(){
  ins[6].style.transition = 'transform .2s';
  ins[6].style.transform = 'scale(1.2)';
  sounds[6].playMode('restart');
  sounds[6].play();
  setTimeout(function(){ins[6].style.transform = 'scale(1)'; }, 200);
}
function p7(){
  ins[7].style.transition = 'transform .2s';
  ins[7].style.transform = 'scale(1.2)';
  sounds[7].playMode('restart');
  sounds[7].play();
  setTimeout(function(){ins[7].style.transform = 'scale(1)'; }, 200);
}
function p8(){
  ins[8].style.transition = 'transform .2s';
  ins[8].style.transform = 'scale(1.2)';
  sounds[8].playMode('restart');
  sounds[8].play();
  setTimeout(function(){ins[8].style.transform = 'scale(1)'; }, 200);
}
function p9(){
  ins[9].style.transition = 'transform .2s';
  ins[9].style.transform = 'scale(1.2)';
  sounds[9].playMode('restart');
  sounds[9].play();
  setTimeout(function(){ins[9].style.transform = 'scale(1)'; }, 200);
}
function p10(){
  ins[10].style.transition = 'transform .2s';
  ins[10].style.transform = 'scale(1.2)';
  sounds[10].playMode('restart');
  sounds[10].play();
  setTimeout(function(){ins[10].style.transform = 'scale(1)'; }, 200);
}
function p11(){
  ins[11].style.transition = 'transform .2s';
  ins[11].style.transform = 'scale(1.2)';
  sounds[11].playMode('restart');
  sounds[11].play();
  setTimeout(function(){ins[11].style.transform = 'scale(1)'; }, 200);
}
function p12(){
  ins[12].style.transition = 'transform .2s';
  ins[12].style.transform = 'scale(1.2)';
  sounds[12].playMode('restart');
  sounds[12].play();
  setTimeout(function(){ins[12].style.transform = 'scale(1)'; }, 200);
}
function p13(){
  ins[13].style.transition = 'transform .2s';
  ins[13].style.transform = 'scale(1.2)';
  sounds[13].playMode('restart');
  sounds[13].play();
  setTimeout(function(){ins[13].style.transform = 'scale(1)'; }, 200);
}
function p14(){
  ins[14].style.transition = 'transform .2s';
  ins[14].style.transform = 'scale(1.2)';
  sounds[14].playMode('restart');
  sounds[14].play();
  setTimeout(function(){ins[14].style.transform = 'scale(1)'; }, 200);
}
function p15(){
  ins[15].style.transition = 'transform .2s';
  ins[15].style.transform = 'scale(1.2)';
  sounds[15].playMode('restart');
  sounds[15].play();
  setTimeout(function(){ins[15].style.transform = 'scale(1)'; }, 200);
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
