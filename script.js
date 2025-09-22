// DOM Element References
var nextBtn = document.querySelector(".next"),
  prevBtn = document.querySelector(".prev"),
  carousel = document.querySelector(".carousel"),
  list = document.querySelector(".list"),
  item = document.querySelectorAll(".item"),
  runningTime = document.querySelector(".carousel .timeRunning");

// Timing Settings
let timeRunning = 3000; // Duration of Slide Transition Animation
let timeAutoNext = 7000; // Delay Before Auto-Switching To Next Slide

// Button Click Events
nextBtn.onclick = function () {
  showSlider("next");
};
prevBtn.onclick = function () {
  showSlider("prev");
};

let runTimeOut;
let runNextAuto = setTimeout(() => {
  nextBtn.click();
}, timeAutoNext);

// Reset & Restart the Progress Bar Animation
function resetTimeAnimation() {
  runningTime.style.animation = "none"; // Remove Current Animation
  runningTime.offsetHeight; /* Trigger Reflow */
  runningTime.style.animation = null;
  runningTime.style.animation = "runningTime 7s linear 1 forwards";
}


// Main Function To Shift Slides
function showSlider(type) {
  let sliderItemsDom = list.querySelectorAll(".carousel .list .item");
  if (type === "next") {
    // Move First Slide To the End (Cycling Forward)
    list.appendChild(sliderItemsDom[0]);
    carousel.classList.add("next");
  } else {
    // Move Last Slide To the Front (Cycling Backward)
    list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
    carousel.classList.add("prev");
  }

  // Clear & Reset Transition Effect After Animation
  clearTimeout(runTimeOut);

  runTimeOut = setTimeout(() => {
    carousel.classList.remove("next");
    carousel.classList.remove("prev");
  }, timeRunning);

  // Reset Auto-Next Timer
  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    nextBtn.click();
  }, timeAutoNext);

  resetTimeAnimation(); // Reset the Progress Bar/Or Running Time Animation
}

// Initialize Animation Oon Load
resetTimeAnimation();
