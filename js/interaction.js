const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".close");
const filter = document.querySelector(".filter");
const submit = document.querySelector("#submit");
const inputs = document.querySelectorAll(".form__input");
const header = document.querySelector("header");
const main = document.querySelector("main");

// Close modal event
modalClose.addEventListener("click", closeModal, false);

// Open modal form
function openModal() {
  modal.style.display = "block";

  inputs[0].focus();
  modal.setAttribute("aria-hidden", "false");
  header.setAttribute("aria-hidden", "true");
  main.setAttribute("aria-hidden", "true");
}

//close the modal
function closeModal() {
  modal.style.display = "none";

  modal.setAttribute("aria-hidden", "true");
  header.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "false");
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

submit.addEventListener("click", validate, false);

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
        e.style.border = "2px solid red";
      } else {
        e.nextElementSibling.style.display = "none";
        e.setAttribute("aria-invalid", "false");
        e.style.border = "2px solid green";
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
