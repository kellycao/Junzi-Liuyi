var flippedPage = document.getElementsByClassName('content');
// for (var i=0; i<flippedPage.length; i++){
//   flippedPage[i].onclick=function(){
//
// // this.style.backgroundImage = "./images/jili.jpg"
// this.style.animation="FlipPage160deg 3s forwards";
//
//   }
// }

// function oddPageFlip(){
//   for (var i=0; i<flippedPage.length; i++){
//     flippedPage[i].onclick = function(){
//       this.style.transition="transform 3s";
//       this.style.transform="rotateY(180deg)";
//     }
//     console.log(i);
// }
// }
//
// oddPageFlip();

function oddPageFlip(a){
  // flippedPage[a].onmouseover = function(){
  //   this.style.transform= "rotateY(10deg)";
  // }
  // flippedPage[a].onmouseout = function(){
  //   this.style.transform = "rotateY(-10deg)";
  // }
  // flippedPage[a].onclick= function(){
    a.style.transition="transform 1s";
    a.style.transform="rotateY(180deg)";
  }
// }
for (var i=0; i<flippedPage.length; i++){
  flippedPage[i].onclick= oddPageFlip(flippedPage[i]);
  console.log(i);
}

// for (var i=0; i<flippedPage.length; i++){
//   flippedPage[i].onclick = function(){
//     this.classList.add("flipped");
//   }
// }

// for (var i=0; i<flippedPage.length; i++){
//   flippedPage[i].addEventListener("click", function(){
//     this.style.transition="transform 1s";
//     this.style.transform="rotateY(160deg)";
//   });
//   flippedPage[i].addEventListener("mouseover", function(){
// this.style.transform= "rotateY(10deg)";
//   });
// }
