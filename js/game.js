const guess_box = document.querySelector(".guess-box");
const hint_span = document.querySelector(".hint>span");
const counter_span = document.querySelector(".counter>span");
const mispelled_span = document.querySelector(".mispelled>span");
const reset_button = document.querySelector(".btn");

let word,
  incorrects = [],
  corrects = [],
  remaining_guesses = 8;

const resetGame = () => {
  incorrects = [];
  corrects = [];
  remaining_guesses = 8;

  counter_span.innerText = remaining_guesses;
  mispelled_span.innerText = "";
};

const generateRandomWord = () => {
  resetGame();

  const randomIndex = Math.floor(Math.random() * wordList.length);
  const randomObj = wordList[randomIndex];
  word = randomObj.word;
  const hint = randomObj.hint;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += '<input type="text" class="box" disabled />';
  }

  guess_box.innerHTML = html;
  hint_span.innerText = hint;
};

const checkLetter = (e) => {
  console.log(e);
  const key = e.key.toLowerCase();
  console.log(key);

  // setting range from a to z (lowercase)
  if (key < "a" || key > "z") {
    return;
  }

  if (incorrects.includes(key) || corrects.includes(key)) {
    return;
  }

  if (!word.includes(key)) {
    incorrects.push(key);
    remaining_guesses--;

    counter_span.innerText = remaining_guesses;
    mispelled_span.innerText = incorrects.join(",");
  }

  if (word.includes(key)) {
    const boxes = document.querySelectorAll(".box");
    for (let i = 0; i < boxes.length; i++) {
      // character present at index i
      const letter = word[i];

      if (letter === key) {
        boxes[i].value = letter;
        corrects.push(key);
      }
    }
  }

  // condition for game end
  if (remaining_guesses === 0) {
    const boxes = document.querySelectorAll(".box");
    for (let i = 0; i < boxes.length; i++) {
      // character present at index i
      const letter = word[i];
      boxes[i].value = letter;
    }

    setTimeout(() => {
      alert("game over!");
      generateRandomWord();
    });
  }

  if (corrects.length === word.length) {
    setTimeout(() => {
      alert("game won!");
      generateRandomWord();
    });
  }
};

reset_button.addEventListener("click", generateRandomWord);
document.addEventListener("keypress", checkLetter);
generateRandomWord();
