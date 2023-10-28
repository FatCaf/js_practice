const square = document.getElementById("black__square");

const black__square = document.querySelectorAll(".black__square");

const yellow__square = document.getElementById("yellow__square");

const hide_btn = document.getElementById("hidden");

const delete_btn = document.getElementById("delete");

const reveal_btn = document.getElementById("reveal");

const input = document.getElementById("text");

const submit = document.getElementById("submit");

const get__image__button = document.getElementById("get__image");

const image__input = document.getElementById("image__input");

let isHidden = false;

hide_btn.addEventListener("click", () => {
  //square.classList.add("hidden");
  for (const item of black__square) {
    item.classList.add("hidden");
  }
  isHidden = true;
});

delete_btn.addEventListener("click", () => {
  square.remove();
});

reveal_btn.addEventListener("click", () => {
  if (isHidden) {
    //square.classList.remove("hidden");
    for (const item of black__square) {
      item.classList.remove("hidden");
    }
    isHidden = false;
  }
});

submit.addEventListener("click", () => {
  const value = input.value;

  for (const item of black__square) {
    item.classList.add(value);
  }
});

let isGreet = false;

yellow__square.addEventListener("click", () => {
  if (isGreet) {
    yellow__square.remove();
  }

  isGreet = true;
  alert("Hello!");
});

get__image__button.addEventListener("click", () => {
  const value = image__input.value;

  const image = document.createElement("img");
  image.setAttribute("src", value);

  image__input.after(image);
});
