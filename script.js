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

  const rows = value.split("\n");

  for (const row of rows) {
    const image = document.createElement("img");
    image.setAttribute("src", row);

    image__input.after(image);
  }
});

const mouseX = document.getElementById("mouseX");
const mouseY = document.getElementById("mouseY");

// Add a mousemove event listener to the document
document.addEventListener("mousemove", (e) => {
  // Update the coordinates with the current mouse position
  mouseX.textContent = e.clientX;
  mouseY.textContent = e.clientY;
});

const userLanguage = navigator.language || navigator.userLanguage;

// Display the detected language in the 'language' span
const languageSpan = document.getElementById("language");
languageSpan.textContent = userLanguage;

// Check if geolocation is supported by the browser
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function (position) {
    // Get latitude and longitude from the position object
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Display the coordinates
    document.getElementById("latitude").textContent = latitude;
    document.getElementById("longitude").textContent = longitude;
  });
} else {
  alert("Geolocation is not supported in your browser.");
}

const p1 = document.getElementById("p1");

p1.addEventListener("input", () => {
  localStorage.setItem("p1", p1.innerHTML);
});

p1.innerHTML = localStorage.getItem("p1");

const p2 = document.getElementById("p2");

p2.addEventListener("input", () => {
  document.cookie = p2.innerHTML;
});

p2.innerHTML = document.cookie;

const p3 = document.getElementById("p3");

p3.addEventListener("input", () => {
  sessionStorage.setItem("p3", p3.innerHTML);
});

p3.innerHTML = sessionStorage.getItem("p3");

window.addEventListener("load", () => {
  p1.innerHTML = localStorage.getItem("p1");
  p2.innerHTML = document.cookie;
  p3.innerHTML = sessionStorage.getItem("p3");
});

const toTopBtn = document.getElementById("to__top");

let isHide = false;

toTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", function () {
  if (isBottomOfPage()) {
    toTopBtn.style.display = "block";
  }
});

function isBottomOfPage() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.offsetHeight;
  const scrollTop = window.scrollY;

  // Check if the user has scrolled to the bottom of the page
  return scrollTop + windowHeight >= documentHeight;
}

const outer = document.getElementById("outer");
const inner = document.getElementById("inner");

outer.addEventListener("click", () => {
  alert("You clicked outer block");
});

inner.addEventListener("click", (event) => {
  alert("You clicked inner block");
  event.stopPropagation();
});

const blurBtn = document.getElementById("blur");
const blurSquare = document.getElementById("blur__square");

blurBtn.addEventListener("click", () => {
  blurSquare.style.display = "block";
  document.body.style.overflow = "hidden";
});

blurSquare.addEventListener("click", () => {
  document.body.style.overflow = "scroll";
  blurSquare.style.display = "none";
});

const myForm = document.querySelector(".my__form");

myForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  // Your custom code to handle the form submission here
});

// File Loader Logic (Transfer to a separate project)

// Byte convertor
function bytesToSize(bytes) {
  const size = ["bytes", "KB", "MB", "GB", "TB"];

  if (!bytes) {
    return "0 Byte";
  }

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

  return Math.round(bytes / Math.pow(1024, i)) + " " + size[i];
}

// Return an specify html element
const element = (tag, classes = [], content) => {
  const node = document.createElement(tag);

  if (classes.length) {
    node.classList.add(...classes);
  }

  if (content) {
    node.textContent = content;
  }

  return node;
};

function noop() {}

const fileInput = document.querySelector("#file");
const dropArea = document.querySelector(".file__loader");

// Main function
function upload(selector, options = {}) {
  let files = [];

  const onUpload = options.onUpload ?? noop;
  const preview = element("div", ["preview"]);
  const open = element("button", ["btn"], "Open");
  const uploadBtn = element("button", ["btn", "primary"], "Upload");
  uploadBtn.style.display = "none";

  if (options.multi) {
    fileInput.setAttribute("multiple", true);
  }

  if (options.accept && Array.isArray(options.accept)) {
    fileInput.setAttribute("accept", options.accept.join(","));
  }

  fileInput.insertAdjacentElement("afterend", preview);
  fileInput.insertAdjacentElement("afterend", uploadBtn);
  fileInput.insertAdjacentElement("afterend", open);

  const triggerClick = () => fileInput.click();

  const allowDrop = (event) => {
    event.preventDefault();
  };

  dropArea.ondragover = allowDrop;

  // Adding files on display
  const changeHandler = (event) => {
    if (event.target && event.target.files) {
      const selectedFiles = event.target.files;

      if (!selectedFiles.length) {
        return;
      }
      uploadBtn.style.display = "inline";

      files = Array.from(event.target.files);

      preview.innerHTML = "";

      files.forEach((file) => {
        if (file.type.match("img")) {
          return;
        }

        const reader = new FileReader();

        reader.onload = (ev) => {
          preview.insertAdjacentHTML(
            "afterbegin",
            `<div class="preview__image">
          <div class="preview__remove" data-name="${file.name}">&times;</div>
        <img src = "${ev.target.result}" alt = "${file.name}" />
        <div class="preview__info"><span>${file.name}</span>
        ${bytesToSize(file.size)}</div>
        </div>`
          );
        };

        reader.readAsDataURL(file);
      });
    }
    // if (!event.target.files.length) {
    //   return;
    // }

    // uploadBtn.style.display = "inline";

    // files = Array.from(event.target.files);

    // preview.innerHTML = "";

    // files.forEach((file) => {
    //   if (file.type.match("img")) {
    //     return;
    //   }

    //   const reader = new FileReader();

    //   reader.onload = (ev) => {
    //     preview.insertAdjacentHTML(
    //       "afterbegin",
    //       `<div class="preview__image">
    //       <div class="preview__remove" data-name="${file.name}">&times;</div>
    //     <img src = "${ev.target.result}" alt = "${file.name}" />
    //     <div class="preview__info"><span>${file.name}</span>
    //     ${bytesToSize(file.size)}</div>
    //     </div>`
    //     );
    //   };

    //   reader.readAsDataURL(file);
    // });
  };

  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    fileInput.files = e.dataTransfer.files;
    const changeEvent = new Event("change", { bubbles: true });
    fileInput.dispatchEvent(changeEvent);
    changeHandler(e);
  });

  // Deleting file from display
  const removeHandler = (event) => {
    if (!event.target.dataset.name) {
      return;
    }

    const { name } = event.target.dataset;
    files = files.filter((file) => file.name !== name);

    if (!files.length) uploadBtn.style.display = "none";

    const block = preview
      .querySelector(`[data-name="${name}"]`)
      .closest(".preview__image");

    block.classList.add("removing");
    setTimeout(() => block.remove(), 300);
  };

  const clearPreview = (el) => {
    el.style.bottom = "4px";
    el.innerHTML = '<div class="preview__info__progress"></div>';
  };

  const uploadHandler = () => {
    preview.querySelectorAll(".preview__remove").forEach((e) => e.remove());
    const previewInfo = preview.querySelectorAll(".preview__info");
    previewInfo.forEach(clearPreview);
    onUpload(files);
  };

  open.addEventListener("click", triggerClick);

  fileInput.addEventListener("change", changeHandler);

  preview.addEventListener("click", removeHandler);

  uploadBtn.addEventListener("click", uploadHandler);
}

upload(fileInput, {
  multi: true,
  accept: [".png", ".jpg", ".jpeg", ".gif"],
  onUpload(files) {
    console.log("Files: ", files);
  },
});
