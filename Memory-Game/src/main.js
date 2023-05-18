// ! copyRight
let year = document.getElementById("now");
year = new Date();
const copyRight = document.querySelector(".footer p span");
copyRight.append(year.getFullYear());

// ! Start Btn & Set Name & Timer
document.querySelector(".btns span").onclick = () => {
  let yourName = prompt("What's Your Name");

  if (yourName == null || yourName == undefined || yourName == false) {
    window.alert("Please, Write Your Name");
  } else {
    document.querySelector(".name span").innerHTML = yourName;
    document.querySelector(".btns").remove();
    const countdown = document.querySelector(".countDown");
    let countDownInterval, minutes, seconds;

    function countDown(duration) {
      countDownInterval = setInterval(() => {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        countdown.innerHTML = `${minutes}:${seconds}`;

        if (--duration < 0) {
          clearInterval(countDownInterval);
          const end = document.querySelectorAll(
            ".memory-container .game-block"
          );
          end.forEach((stop) => {
            stop.classList.add("stop");
          });
        }
      }, 1000);
    }
    countDown(120);
  }
};

// ! Shuffle Blocks
let duration = 1000;
const blocksContainer = document.querySelector(".memory-container "),
  blocks = Array.from(blocksContainer.children),
  orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", () => {
    flipBlock(block);
  });
});

// ! Flip Block Function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add(`is-flipped`);
  const flippedBlocks = blocks.filter((flippedBlocks) =>
    flippedBlocks.classList.contains(`is-flipped`)
  );

  if (flippedBlocks.length === 2) {
    stopClicking();
    matchedBlock(flippedBlocks[0], flippedBlocks[1]);
  }

  function stopClicking() {
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
      blocksContainer.classList.remove(`no-clicking`);
    }, duration);
  }

  setTimeout(() => {
    selectedBlock.classList.remove(`is-flipped`);
  }, duration);
}

// ! Matched Block
function matchedBlock(First, Second) {
  const tries = document.querySelector(".tries span");

  if (First.dataset.technology === Second.dataset.technology) {
    First.classList.remove(`is-flipped`), Second.classList.remove(`is-flipped`);
    First.classList.add(`has-match`), Second.classList.add(`has-match`);
    document.getElementById("success").play();
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    setTimeout(() => {
      First.classList.remove(`is-flipped`),
        Second.classList.remove(`is-flipped`);
    }, duration);
    document.getElementById("fail").play();
  }
}

// ! Shuffle Function
function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    // ! [1] Save Current Element In Stash
    temp = array[current];
    // ! [2] Current Element = Random Element
    array[current] = array[random];
    // ! [3] Random Element = Get Element From Stash
    array[random] = temp;
  }
}
