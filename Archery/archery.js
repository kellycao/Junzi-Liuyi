document.documentElement.style.overflow = 'hidden';

window.onload = function(){

  //start game

  var startPage = document.getElementById("startMenu");
  var start = document.getElementById("start");
  var gameScore = document.getElementById("score");
  start.addEventListener("mouseover", function() {
    this.style.textShadow = "1px 2px #aaa";
  });
  start.addEventListener("mouseout", function() {
    this.style.textShadow = "none";
  });
  start.addEventListener("click", startGame);

  function startGame() {
    startPage.style.display = "none";
    gameScore.style.display = "block";
    loadGame();
  }
function loadGame(){

      //timer grid
    var countTimeOut;
    function countTime(){
    var container = document.getElementById("timerDiv");
    container.innerHTML = "<div class='timer'></div>";
    countTimeOut = setTimeout(shoot,5500);
    }
    countTime();


    var gameScore = document.getElementById("score");
    var bestScore=0;
    var totalScore = 0;
    var autoMove = false;


    var w = window.innerWidth;
    var h = window.innerHeight;
//portrait screen
    if(h > w){
        document.getElementById("mainContainer").style.transform = "translateX("+(w)+"px) rotate(90deg)";
        document.getElementById("mainContainer").style.width = h+"px";
        var nh = h;
        h = w;
        w = nh;

    }

    //get a new arrow when hit the center
    var updatePointArea = document.getElementById("showPoint");
    updatePointArea.style.height = h+"px";
    updatePointArea.style.width = w+"px";
    var uScore = document.querySelector("#showPoint .u");
    var arrs = document.getElementById("arrs");

    function updArr(arrNum){
        var arr = "&#8613";
        arr = arr.repeat(arrNum);
        arrs.innerHTML = arr;
    }

    function animateScore(scr,arrNum){
        if(scr >= 7) uScore.innerHTML = "&#8613 +"+scr;
        else uScore.innerHTML = "+"+scr;
        updArr(arrNum);
        //score parabola path
        var t = 50, l = 70, o = 1;
        var animIntv = setInterval(function(){
            uScore.style.top = t + "%";
            uScore.style.left = l + "%";
            uScore.style.opacity = o;
            t-=4;
            l-=3;
            o-=0.1;
        },100)
        setTimeout(function(){
            clearInterval(animIntv);
            uScore.style.opacity = 0;
            uScore.style.top = "50%";
            uScore.style.left = "70%";
        },1000);
    }



    //draw targetboard

    var c = document.getElementById("myCanvas");
    c.height = h;
    c.width = w;
    var ctx = c.getContext("2d");

    var c2 = document.getElementById("animCanvas");
    c2.height = h;
    c2.width = w;
    var ctx2 = c2.getContext("2d");

        var board = {
            x:w-40,
            y:h/2,
            dy:4,
            height:150,
            width:100
        }

        var boardY;
        var boardMove = false;
        var totalArr = 5;
        updArr(totalArr);

//? drawBoard behind the arrow?
        function drawBoard() {
          ctx.beginPath();
        ctx.ellipse(board.x + board.width / 6, board.y, board.width / 2, board.height / 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = "#f7e394";
        ctx.strokeStyle = "#804C2A";
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(board.x + board.width / 6, board.y, board.width / 3, board.height / 8 * 3, 0, 0, Math.PI * 2);
        ctx.fillStyle = "#61001E";
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(board.x + board.width / 6, board.y, board.width / 16 * 3, board.height / 12 * 3, 0, 0, Math.PI * 2);
        ctx.fillStyle = "#f7e394";
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(board.x + board.width / 6, board.y, board.width / 12, 15, 0, 0, Math.PI * 2);
        ctx.fillStyle = "#B80800";
        ctx.fill();
            ctx.fillStyle = "#000";

        //board out of screen
            if(board.y >= h || board.y <= 0){
                board.dy *= -1;
            }


    var checkArrowMoveWithBoard1 = false;
    var checkArrowMoveWithBoard2 = false;
    //board move constantly
            if(autoMove){
                board.y += board.dy;
                if(checkArrowMoveWithBoard1){
                    arrow1.moveArrowWithBoard(1);
                }
                else if(checkArrowMoveWithBoard2){
                    arrow2.moveArrowWithBoard(1);
                }
            }
            else{

                if(boardMove){
                  //board move 1 unit
                    if(Math.abs(board.y - boardY) > 5){
                        board.y += board.dy;
                        arrow1.moveArrowWithBoard(1);
                        arrow2.moveArrowWithBoard(1);
                    }
                }
                else{
                  //board not move
                    if(Math.abs(board.y - boardY) > 5){
                        board.y -= board.dy;
                        arrow1.moveArrowWithBoard(-1);
                        arrow2.moveArrowWithBoard(-1);
                    }
                }
            }
        }


//draw bow
    var arc = {
        x:30,
        y:100,
        dy:3,
          r:50,
          color:"#000",
          lw:3,
          start:Math.PI+Math.PI/2,
          end:Math.PI-Math.PI/2
    }

    function drawArc() {
      ctx.beginPath();
      ctx.arc(arc.x, arc.y, arc.r, arc.start, arc.end);
      ctx.strokeStyle = arc.color;
      ctx.lineWidth = arc.lw;
      ctx.stroke();
      ctx.closePath();
    }

//draw rope
    var rope = {
        h:arc.r*2,
          lw:1,
          x:arc.x-25,
          color:"#888",
          status:true
    }

    //rope from arc to straight line
    function drawRope() {
      ctx.beginPath();
      ctx.moveTo(arc.x, arc.y - arc.r);
      if (arrow1.vis && arrow2.vis) {
        ctx.lineTo(rope.x, arc.y);
      }
      ctx.lineTo(arc.x, arc.y + arc.r);
      ctx.lineWidth = rope.lw;
      ctx.strokeStyle = rope.color;
      ctx.stroke();
      ctx.closePath();
    }



//draw arrow
    function Arrow(){
        this.w = 85;
        this.x = arc.x-25;
        this.dx = 20;
        this.status = false;
        this.vis = true;
        this.fy = arc.y;
    }

    Arrow.prototype.drawArrow = function() {
        if(this.vis) {
            if(this.status) {
                ctx.fillRect(this.x,this.fy-3,10,6);
                ctx.fillRect(this.x,this.fy-1,this.w,2);
                ctx.beginPath();
                ctx.moveTo(this.x+this.w,this.fy-4);
                ctx.lineTo(this.x+this.w+12,this.fy);
                ctx.lineTo(this.x+this.w,this.fy+4);
                ctx.fill();
//shooting track
                if(moveArrowCheck) {
                    if(this.x < w-155){
                        this.x += this.dx;
                    }
                    else {
                        if(!(this.fy <= board.y-board.height/2 || this.fy >= board.y+board.height/2) || this.x > w){
//shooting depth
                            if(this.x > w-110){
                              //shooting arrow move with board, next arrow visible
                                if(this == arrow1){
                                    arrow2.vis = true;
                                    checkArrowMoveWithBoard1 = true;
                                    checkArrowMoveWithBoard2 = false;
                                }
                                else {
                                    arrow1.vis = true;
                                    checkArrowMoveWithBoard1 = false;
                                    checkArrowMoveWithBoard2 = true;
                                }
                                moveArrowCheck = false;
                                score++;
                                if(score === 4){
                                    arc.dy = 5;
                                }
                                else if(score === 8){
                                    autoMove = true;
                                }

//score according to shooting position
                                if(this.fy >= board.y-board.height/2 && this.fy <= board.y+board.height/2) {

                                    var scores = this.fy - board.y;
                                    var currentScore = Math.round(board.height/20)-Math.round(Math.abs(scores/10));
                                    if(currentScore >= 7){

                                        totalArr+=2;

                                }

                                totalScore += currentScore;
                                gameScore.innerHTML = totalScore;

                                animateScore(currentScore,totalArr);

                                boardY = board.y + scores;
                                if(scores>=0){
                                    boardMove = true;
                                }
                                else {
                                    boardMove = false;
                                }

                            }
                            else updArr(totalArr);
                                if(totalArr <= 0){
                                    clearInterval(intv);

                                document.getElementById("animCanvas").removeEventListener("click",shoot);
                                document.body.removeEventListener("keydown",shoot);
                                startPage.style.display = "block";
                                document.getElementById("title").innerHTML = "您的得分<br>"+totalScore;
                                // container.innerHTML = ""
                                if(bestScore < totalScore){
                                    bestScore = totalScore;

                            }
                            document.getElementById("score").innerHTML = 0;
                            document.getElementById("best").innerHTML = bestScore;
                            }

                            }
                            else {
                                this.x += this.dx;
                            }
                        }
                        else {
                            this.x += this.dx;
                        }
                    }
                }
            }
            else {
                ctx.fillRect(rope.x,arc.y-3,10,6);
                ctx.fillRect(rope.x,arc.y-1,this.w,2);
                ctx.beginPath();
                ctx.moveTo(rope.x+this.w,arc.y-4);
                ctx.lineTo(rope.x+this.w+12,arc.y);
                ctx.lineTo(rope.x+this.w,arc.y+4);
                ctx.fill();
            }
        }
    }

    // arrow move with board

    Arrow.prototype.moveArrowWithBoard = function(dir) {
        if(this == arrow1){
            arrow1.fy += board.dy*dir;
        }
        else {
            arrow2.fy += board.dy*dir;
        }
    }


    var arrow1 = new Arrow();
    var arrow2 = new Arrow();

    var arrows = 0;
    var moveArrowCheck = false;
    var score = 0;


    // moving function

    function move () {
          ctx.clearRect(0,0,w,h);
          if(arc.y>h-50 || arc.y<50){
            arc.dy*=-1;
          }
          arc.y+=arc.dy;
    }

    function shoot(){
          if(arrow1.vis && arrow2.vis && arrows != -1){
            moveArrowCheck = true;
            clearTimeout(countTimeOut);
    countTime();
            //shoot one arrow, next invisible
            if(arrows%2===0){
                  arrow1.status = true;
                  arrow1.fy = arc.y;
                  arrow2.status = false;
                  arrow2.x = rope.x;
                  arrow2.vis = false;
                }
            else{
                  arrow1.status = false;
                  arrow2.fy = arc.y;
                  arrow2.status = true;
                  arrow1.x = rope.x;
                  arrow1.vis = false;
            }
            totalArr--;

          }
          arrows++;
    }


    document.getElementById("animCanvas").addEventListener("click",shoot);
     document.body.addEventListener("keydown",shoot);

    var intv = setInterval(function(){
          move();
          drawArc();
          drawRope();
          arrow1.drawArrow();
          arrow2.drawArrow();
          drawBoard();
    },15)
}
}
