var headline = document.getElementsByTagName('h1');
// function normal(){
  headline[0].style.transition = "all 3s"
  headline[0].onmouseout = function(){
    this.style.paddingLeft = "2em";
    this.style.opacity = "0.75";
  }

  headline[1].style.transition = "all 3s"
  headline[1].onmouseout = function(){
    this.style.paddingLeft = "2em";
    this.style.opacity = "0.75";
  }
// }
// function transition(){
  headline[0].style.transition = "all 3s"
  // headline[0].style.transition = "opacity 3s"
  headline[0].onmouseover = function(){
    this.style.paddingLeft = "1.5em";
    this.style.opacity = "1";
  }

  headline[1].style.transition = "all 3s"
  headline[1].onmouseover = function(){
    this.style.paddingLeft = "2.5em";
    this.style.opacity = "1";
  }
// }

// headline.onmouseover = transition();
// headline.onmouseout = normal();
