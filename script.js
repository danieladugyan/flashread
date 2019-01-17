const electron = require('electron');
const {ipcRenderer} = electron;

// Create async timeout function.
const delay = (amount, number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, amount);
  });
};

// Window control buttons.
document.querySelector("#minimize").addEventListener("click", function () {
  ipcRenderer.send("button:minimize");
});

document.querySelector("#minmax").addEventListener("click", function () {
  ipcRenderer.send("button:minmax");
});

document.querySelector("#close").addEventListener("click", function () {
  ipcRenderer.send("button:close");
});

// Handle form and form submission.

const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

function submitForm (event) {
  event.preventDefault();

  document.querySelector("#readtext").style.display = "inline"; // Show text
  document.querySelector("#form-container").style.display = "none"; // Hide form
  // Handle input and split the text into array of words.
  const text = document.querySelector("#textsub").value;
  let list = text.split(/\s+/);

  // Control WPM.
  let speed = document.querySelector("#speed").value;
  speed = 300 + (300 * speed / 100);

  let time = (1/(speed / 60)) * 1000; // 380 WPM = 6.3 WPS <=> 150 ms

  // Select h1 to display words in text.
  word = document.querySelector("#word");

  // Iterate through list and pause between words using async await.
  async function loop() {
    for (let i = 0; i < list.length; i++) {
      console.log(list[i]);
      word.innerHTML = list[i];
      await delay(time);
    }
    document.querySelector("#form-container").style.display = "inline"; // Show form
    document.querySelector("#readtext").style.display = "none"; // Hide text
  }
  loop();
};
