var audio = new Audio("./Sound/theme1.mp3");
var out = new Audio("./Sound/out.mp3");
var beeeat = new Audio("./Sound/bee.mp3");
audio.play();
var bird = document.getElementById("bird");
var left = 0;
var t = 0;
var sp = 19;
var wid = window.innerWidth;
var ht = window.innerHeight - 120;
// console.log(wid, ht);
const width = window.innerWidth;
var move = width * (11 / 2000);
var wall2pos = -5 * (width / 10);
var wall1pos = -(width / 10);
var beepos = -1 * width * Math.max(2, Math.random() * 6);
var score = 0;
var wall1 = document.querySelector("#wall1");
var wall2 = document.querySelector("#wall2");
var w1height = Math.max(200, Math.random() * ht * (7 / 10));
var w2height = Math.max(200, Math.random() * ht * (7 / 10));
wall1.style.height = w1height + "px";
wall2.style.height = w2height + "px";
wall1.style.backgroundSize = 50 + "px " + w1height + "px";
wall2.style.backgroundSize = 50 + "px " + w2height + "px";
var gamepaused = false;
var gameover = false;

// let name = "Sourav"
let name = localStorage.getItem("Name");
var logos = [
  "./Utils/logo1.jpeg",
  "./Utils/logo2.jpeg",
  "./Utils/logo3.jpeg",
  "./Utils/logo4.jpeg",
  "./Utils/logo5.jpeg",
  "./Utils/logo6.jpeg",
  "./Utils/logo7.jpeg",
  "./Utils/logo8.jpeg",
  "./Utils/logo9.jpeg",
  "./Utils/logo10.jpeg",
];
var logo = logos[Math.floor(Math.random() * 9)];
// console.log(logo);

document.querySelector(".profile").style.backgroundImage = "url(" + logo + ")";
document.querySelector(".name").innerHTML = name;

//Game Loop
setInterval(() => {
  if (score % 10 == 0 && score != 0) {
    move += 2;
    score += 1;
  }
  if (!gamepaused && !gameover) {
    // document.querySelector('.container').removeAttribute('style');
    if (audio.paused) {
      audio.play();
    }
    wall1pos += move;
    wall2pos += move;
    beepos += 0.8 * move;
    document.getElementById("score").innerHTML = "Score : " + score;
    let bee = document.querySelector("#bee").getBoundingClientRect();
    //collision with bee
    if (rectIntersect(left + 40, t + 70, 120, 80, bee.x, bee.y, 52, 52)) {
      score += 5;
      beepos = -1 * width * Math.max(2, Math.random() * 6);
      beeeat.play();
    }
    //collision with wall
    if (
      rectIntersect(
        left + 40,
        t + 70,
        120,
        80,
        width - wall1pos,
        0,
        50,
        w1height
      ) ||
      rectIntersect(
        left + 40,
        t + 70,
        120,
        80,
        width - wall2pos,
        window.innerHeight - w2height,
        50,
        w2height
      )
    ) {
      wall1pos = wall1pos = -(width / 10);
      wall2pos = -(width / 2);
      audio.pause();
      out.play();
      document.getElementById("bird").setAttribute("style", "display:none;");
      document
        .querySelector(".container")
        .setAttribute("style", "animation-name:test;");
      document.getElementById("gameover").classList.add("pop");
      gameover = true;
    }
    if (Math.abs(wall1pos - wall2pos) < 250) {
      wall2pos = -(width / 2);
    }
    if (wall1pos > width) {
      wall1pos = -(width / 10);
      score += 1;
      w1height = Math.max(200, Math.random() * ht * (7 / 10));
      wall1.style.height = w1height + "px";
      wall1.style.backgroundSize = 50 + "px " + w1height + "px";
    }
    if (wall2pos > width) {
      wall2pos = -(width / 2);
      score += 1;
      w2height = Math.max(200, Math.random() * ht * (7 / 10));
      wall2.style.height = w2height + "px";
      wall2.style.backgroundSize = 50 + "px " + w2height + "px";
    }
    if (beepos > width) {
      beepos = -1 * width * Math.max(2, Math.random() * 6);
    }
    document.querySelector("#wall1").style.right = wall1pos + "px";
    document.querySelector("#wall2").style.right = wall2pos + "px";
    document.querySelector("#bee").style.right = beepos + "px";
  } else {
    audio.pause();
  }
}, 20);
function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
  if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
    return false;
  }
  return true;
}

//########################################################################################



document.addEventListener("keydown", function (e) {
  var key = e.which;
  e.preventDefault();
  if (gameover) {
    return;
  }
  if (gamepaused) {
    switch (key) {
      case 32:
        if (gamepaused) {
          document.querySelector(".pause").style.visibility = "hidden";
          // console.log("game is pause= ", gamepaused)
          gamepaused = false;
          break;
        } else {
          document.querySelector(".pause").style.visibility = "visible";
          // console.log("game is pause= ", gamepaused)
          gamepaused = true;
          break;
        }
      default:
        return;
    }
  } else {
    switch (key) {
      case 32:
        if (gamepaused) {
          document.querySelector(".pause").style.visibility = "hidden";
          // console.log("game is pause= ", gamepaused)
          gamepaused = false;
          break;
        } else {
          document.querySelector(".pause").style.visibility = "visible";
          // console.log("game is pause= ", gamepaused)
          gamepaused = true;
          break;
        }
    }
  }
});











var op_down = false;
var op_up = false;
var op_left = false;
var op_right = false;
var op_d = false;
var op_u = false;
var op_l = false;
var op_r = false;

document.addEventListener("keyup", function (e1) {
  key = e1.which;
  if (key == 38 || key == 87) {
    op_up = true;
    op_u = false;
  }
  if (key == 40 || key == 83) {
    op_down = true;
    op_d = false;
  }
  if (key == 39 || key == 68) {
    op_right = true;
    op_r = false;
  }
  if (key == 37 || key == 65) {
    op_left = true;
    op_l = false;
  }
});
document.addEventListener("keydown", function (e) {
  key = e.which;
  if (e.which == 40 || e.which == 83) {
    op_d = true;
  }
  if (e.which == 38 || e.which == 87) {
    op_u = true;
  }
  if (e.which == 39 || e.which == 68) {
    op_r = true;
  }
  if (e.which == 37 || e.which == 65) {
    op_l = true;
  }

  e.preventDefault();
  if (gameover) {
    return;
  }
  // if (op_d && op_u) {
  //   return;
  // }
  // if ((e.which==87 || e.which==38) && (e.which==40 || e.which==83)){
  // }
  // if (e.which==87 && (e.which==40 || e.which==83)){
  //   return;
  // }
  op_down = false;
  op_up = false;
  op_left = false;
  op_right = false;

  if (e.which == 40 || e.which == 83) {
    var mnc = setInterval(() => {
      if (op_u && !op_up){
        console.log("Na chalau!");
      }
      if(op_d && !op_u && t < ht) {
        t = t + sp;
        bird.style.top = t + 'px';
        console.log(t);
      }

      if (op_down) {
        clearInterval(mnc);
      }
    }, 10);
  }
  else if (e.which == 38 || e.which == 87) {
    var mnc1 = setInterval(() => {
      if (op_d && !op_down){
        console.log("Na chalau!");
      }
      if (op_u && !op_d && t >= -40) {
        t = t - sp;
        bird.style.top = t + 'px';
        console.log(t);
      }

      if (op_up) {
        clearInterval(mnc1);
      }
    }, 10);
  }
  else if (e.which == 39 || e.which == 68) {
    var mnc = setInterval(() => {
      if (op_r && !op_right){
        console.log("Na Chalau!");
      }
      if (op_r && !op_l && left <= wid) {
        left = left + sp;
        bird.style.left = left + 'px';
      }
      if (op_right) {
        clearInterval(mnc);
      }
    }, 10);
  }
  else if (e.which == 37 || e.which == 65) {
    var mnc = setInterval(() => {
      if (op_l && !op_left){
        console.log("Na Chalau!");
      }
      if (op_l && !op_r && left > 0) {
        left = left - sp;
        bird.style.left = left + 'px';
      }
      if (op_left) {
        clearInterval(mnc);
      }
    }, 10);
  }
});
