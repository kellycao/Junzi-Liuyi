document.documentElement.style.overflow='hidden';

var headline = document.getElementsByTagName('h1');
// function normal(){
//   headline[0,1].style.transition = "all 3s";
//   headline[0,1].style.paddingLeft = "2em";
//   headline[0,1].style.opacity = "0.75";
//   }
// function transition(){
// headline[0,1].style.transition = "all 3s";
// headline[0,1].style.opacity = "1";
//   headline[0].style.paddingLeft = "1.5em";
//   headline[1].style.paddingLeft = "2.5em";
//   }
// headline[0,1].onmouseover = transition();
// headline[0,1].onmouseout = normal();

headline[0].onmouseover=function(){
  this.style.transition = "all 3s";
  this.style.opacity = "1";
  this.style.paddingLeft = "1em";
}
 headline[0].onmouseout=function(){
this.style.transition = "all 3s";
   this.style.opacity = "0.75";
   this.style.paddingLeft = "1.5em";
 }

 headline[1].onmouseover=function(){
   this.style.transition = "all 3s";
   this.style.opacity = "1";
   this.style.paddingLeft = "2em";
 }
  headline[1].onmouseout=function(){
 this.style.transition = "all 3s";
    this.style.opacity = "0.75";
    this.style.paddingLeft = "1.5em";
  }
