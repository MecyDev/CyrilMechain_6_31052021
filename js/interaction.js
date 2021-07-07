const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".close");
const filter = document.querySelector(".filter");
const submit = document.querySelector("#submit");
const inputs = document.querySelectorAll(".form__input");
const header = document.querySelector("header");
const main = document.querySelector("main");
const lightbox = document.querySelector(".lightbox");
const lightboxClose = document.querySelector(".lightbox__close");
const lightboxNav = document.querySelectorAll(".lightbox__navig");

// Close modal event
modalClose.addEventListener("click", closeModal, false);

// Open modal form
function openModal() {
  modal.style.display = "block";
  filter.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  header.setAttribute("aria-hidden", "true");
  main.setAttribute("aria-hidden", "true");
}

//close the modal
function closeModal() {
  modal.style.display = "none";
  filter.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  header.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "false");
}

//close the modal
function closeLightbox() {
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden", "false");
}

inputs.forEach(
  (i) =>
    i.addEventListener("input", function () {
      if (i.validity.valid === false) {
        i.nextElementSibling.style.display = "inline";
      } else {
        i.nextElementSibling.style.display = "none";
      }
    }),
  false
);

lightboxNav.forEach(
  (nav) =>
    nav.addEventListener("click", function () {
      if (nav.classList.contains("fa-chevron-left")) {
        console.log("left");
      } else {
        console.log("right");
      }
    }),
  false
);

submit.addEventListener("click", validate, false);

lightboxClose.addEventListener("click", closeLightbox, false);

//Validate the form when click on button submit
function validate() {
  //Variables for select all inputs and form
  const form = document.querySelector("form");

  //Check for form validity
  if (form.checkValidity() === false) {
    //Check if inputs are valid or not with HTML5 Web API
    //Change attribute "data-error-visible" for show the error message or not
    //Exclude the checkbox2 because is not required for validate form

    inputs.forEach(function (e) {
      if (e.validity.valid === false) {
        e.nextElementSibling.style.display = "inline";
      } else {
        e.nextElementSibling.style.display = "none";
      }
    });
  } else {
    inputs.forEach(function (e) {
      console.log(e.value);
    });

    form.reset();

    inputs.forEach(function (e) {
      e.nextElementSibling.style.display = "none";
      modal.style.display = "none";
    });
  }

  //for keep form on screen when submit
  return false;
}
