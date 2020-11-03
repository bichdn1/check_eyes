const time = document.querySelector("#time");
const score = document.querySelector("#score");
const user = document.querySelector("#name");
const listColor = document.querySelectorAll(".card");

// var opacityColor;
var positionRight;
var countNumberRight = 0;
var timeInterval;

// create random color
function createColor() {
  let color = "rgb(";
  for (let i = 0; i < 3; i++) {
    color += Math.floor(Math.random() * 256);
    if (i !== 2) {
      color += ",";
    } else {
      color += ")";
    }
  }
  // opacityColor = (Math.floor(Math.random() * 11) / 10).toFixed(1);
  return color;
}

// set color for card div
function setColor() {
  let color = createColor();
  positionRight = Math.floor(Math.random() * 10);

  for (let i = 0; i < 10; i++) {
    listColor[i].style.backgroundColor = color;
    listColor[i].style.opacity = "1";

    // set a different color
    if (positionRight === i) {
      if (countNumberRight < 4) {
        listColor[i].style.opacity = "0.4";
      } else if (countNumberRight >= 6 && countNumberRight < 7) {
        listColor[i].style.opacity = "0.6";
      } else {
        listColor[i].style.opacity = "0.85";
      }
    }
  }
  chooseTime();
}

//count down times
function chooseTime() {
  let maxTime = 15;
  timeInterval = setInterval(function () {
    if (maxTime >= 0) {
      time.textContent = maxTime;
      --maxTime;
    } else {
      clearInterval(timeInterval);
      alert("Lose!!!");
    }
  }, 1000);
}

// set name of username
user.textContent = sessionStorage.getItem("username");

setColor();

listColor.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    let index = Number(e.target.textContent) - 1;
    if (index === positionRight) {
      clearInterval(timeInterval);
      countNumberRight++;

      //calculation score
      let timeRemain = 15 - Number(time.textContent);
      let sumScore = countNumberRight * 100 + timeRemain * 10;
      console.log(sumScore);
      score.textContent = Number(score.textContent) + sumScore;
      if (countNumberRight >= 10) {
        alert("Winner!!!");
      } else {
        setColor();
      }
    }
  });
});
