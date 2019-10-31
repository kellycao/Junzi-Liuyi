document.documentElement.style.overflow='hidden';
var headline = document.getElementById('headline');
var a = document.getElementById('a');
var b = document.getElementById('b');

headline.onmouseover=function(){
  a.style.transition = "all 3s";
  b.style.transition = "all 3s";
  a.style.transform="translateY(-50%)";
  b.style.transform="translateY(50%)";
  a.style.opacity= 1;
  b.style.opacity= 1;
}
