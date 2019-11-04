document.documentElement.style.overflow='hidden';
//title transition
var a = document.getElementById('a');
var b = document.getElementById('b');
window.onload=function(){
  a.style.transition = "all 4s";
  b.style.transition = "all 4s";
  a.style.transform="translateY(-50%)";
  b.style.transform="translateY(50%)";
  a.style.opacity= 1;
  b.style.opacity= 1;
}

//menu shadow effect

var words = document.getElementsByTagName('h2');
var imgGroup = document.getElementsByTagName('img');
var i=0;
function shadow(i){
  imgGroup[i].onmouseover = function(){
  words[i].style.textShadow = "5px 5px 5px #9fa6ad";
  }
  imgGroup[i].onmouseout = function(){
    words[i].style.textShadow = "none";
  }
}
shadow(0);
shadow(1);
shadow(2);
shadow(3);
shadow(4);
shadow(5);
shadow(6);


//   for (var i=0; i<3; i++){
//     for (var j=0; j<3; j++){
//       if (i===j) {
//       ruleGroup[i].onmouseover = function(){
//     rule[j].style.textShadow = "5px 5px 5px #9fa6ad";
//     }
//   }
//   }
// }
