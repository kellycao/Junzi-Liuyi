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
// var i;

  function shadow(i){
    imgGroup[i].onmouseover = function(){
    words[i].style.textShadow = "5px 5px 5px #9fa6ad";
    }
    imgGroup[i].onmouseout = function(){
      words[i].style.textShadow = "none";
    }
  }

for (var i=0; i<imgGroup.length; i++){
  shadow(i);
}
