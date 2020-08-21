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

const form = document.querySelector('#form-container');
form.addEventListener('submit', submitForm);

let cancelstatus = 0;
const cancel = document.querySelector('#readcancel');
cancel.addEventListener('click', cancelRead)

function cancelRead () {
  cancelstatus = 1;
  console.log("toggle break on");
}

function submitForm (event) {
  cancelstatus = 0;
  console.log("toggle break off");
  event.preventDefault();

  document.querySelector("#readtext").style.display = "inline"; // Show text
  cancel.style.display = "block"; // Show cancel
  form.style.display = "none"; // Hide form
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
      //console.log(list[i]);
      word.innerHTML = list[i];
      await delay(time);
      if (cancelstatus == 1) {
        console.log("Break!")
        break;
      }

    }
    form.style.display = "inline"; // Show form
    cancel.style.display = "none"; // Hide cancel
    document.querySelector("#readtext").style.display = "none"; // Hide text
  }
  loop();
};
