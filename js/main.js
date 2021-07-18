/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */

// Main JS

// The Url of the JSon Data
const url = `http://${window.location.host}/js/json/FishEyeData_m.json`;
const uriParam = window.location.search; // for get the parameter after "?"

const select = document.querySelector('#tri-select');
const contentBtn = document.querySelector('.btn--content');

let tag = ''; // The tag for filter Photographers

let triType = 'Popularité'; // The type of sort for sort medias on Photograph PAge

const param = new URLSearchParams(uriParam);

const jsonData = jData(url); // Use the function Jdata for take the json data

// Main part of program. For genrate Home page and Photograph Page.

// For generate Photograph Page.
if (param.has('photograph')) {
  // Get the ID in URl.
  const photographId = param.get('photograph');

  // Use function displayPhotograph() for generate the page
  // eslint-disable-next-line no-unused-vars
  let showPhotogPage = displayPhotograph(photographId).then(() => {
    interact(); // Function for all the interactions possible in the page
  });

  // This part is for sort the medias and recall the displayPhotograph() with new order.
  // Order by default is "Popularity"
  select.addEventListener(
    'change',
    () => {
      triType = select.value;
      document.querySelector('.informations').innerHTML = '';
      document.querySelector('.medias').innerHTML = '';
      document.querySelector('.recall').innerHTML = '';
      document.querySelector('.modal__header').innerHTML = 'Contactez-moi ';

      showPhotogPage = displayPhotograph(photographId).then(() => {
        interact();
      });
    },
    false,
  );
} else if (param.has('tag')) {
  // This part is for filter Photographers By tag.

  // Get the tag in Url
  tag = param.get('tag');

  // Generate Home Page with only Photograph who match with tag
  displayPhotograph().then(() => {
    const tagSelect = document.querySelectorAll('.tag');

    tagSelect.forEach((e) => {
      if (e.querySelector('span').innerText.toLocaleLowerCase() === tag) {
        if (!e.classList.contains('tag--select')) e.classList.add('tag--select');
      }
    }, false);

    // end then
  });

  // end else if
} else {
  // This part is for generate the Home Page with all Photographers without tag filter.
  // Default Home Page.
  displayPhotograph().then(() => {
    interactHome(); // Just for the button who appear when scroll down.
  });
}
// End Main Part.

// This part contains all the function need for genrate page and interact with pages.

// Function async for fetch the Json Data and return the Json() reponse.
// eslint-disable-next-line consistent-return
async function jData(uri) {
  const response = await fetch(uri);

  if (response.status >= 200 && response.status < 300) {
    const data = await response.json();
    return data;
  }
  console.error(response);
}

// The principal function. Serve to diplay Photographers Cards or Photographers Pages.
function displayPhotograph(id) {
  // To empty section "main" in Home Page.
  if (id === undefined) {
    document.querySelector('main').innerHTML = '';
  }

  // To browse any Photograph in the JSon Data file.
  const result = jsonData.then((jsonListPhotograph) => {
    for (const jsonPhotograph of jsonListPhotograph.photographers) {
      const list = [];
      // Browse all Medias for find the medias that belong to the photographer and
      // put them in the list array.
      for (const m of jsonListPhotograph.media) {
        if (m.photographerId === jsonPhotograph.id) {
          list.push(m);
        }
      }

      jsonPhotograph.medias = list; // Add the Array list in Photograph Datas.

      // this part is for displays Photograph in section "main" of HOme Page.
      // Use the function filterBytags() for filter By tag if tag are selectionned.
      if (id === undefined && filterByTag(jsonPhotograph.tags)) {
        const photograph = new Photograph(jsonPhotograph);
        document.querySelector('main').innerHTML += photograph.card;
      } else if (parseInt(jsonPhotograph.id, 10) === parseInt(id, 10)) {
        // This part is for the Photograph Page. If ID !empty this part generate
        // the information page and display all medias of the Photograph.

        const photograph = new Photograph(jsonPhotograph);
        document.querySelector('.informations').innerHTML
            += photograph.information;
        media(photograph.tri(triType)); // Get madias and the type of sort for sort medias.
        document.querySelector('.modal__header').innerHTML += photograph.name;
        // Generate the part who show all likes and day price.
        document.querySelector('.recall').innerHTML += `
          <p id="totalLikes">${photograph.totalLikes}</p><i class="fas fa-heart recall__icon"></i>
          <p>${photograph.priceDay}€ / jour</p>
          `;
      }
    }
  });

  return result;
}

// Function for filter Photograph By tags. Return true if tag are empty or the tag match.
// Else return false.
function filterByTag(phTags) {
  if (tag === '') {
    return true;
  }

  const find = phTags.includes(tag);

  if (find === true) {
    return true;
  }
  return false;
}

// Function factory for instantiate the good Class if media is Photo or Video.
// Take 3 parameters : The type of media, the informations of media and a counter
// for generate an ID for media.
function factory(type, e, c) {
  switch (type) {
    case 'photo':
      return new Photo(e, c);
    case 'video':
      return new Video(e, c);
    default:
      return false;
  }
}

// This function iterate on each media of a Photogtraph for find if
// Photo or Video and call the methods for display the card.
// A counter is present for genrate an ID for all medias.
function media(m) {
  let med;
  let c = 0;
  m.forEach((e) => {
    if (e.hasOwnProperty('image')) {
      med = factory('photo', e, c);
    } else {
      med = factory('video', e, c);
    }
    document.querySelector('.medias').innerHTML += med.makeCard;
    c += 1;
  });
}

// The main function for interact with Photograph Page.
function interact() {
  // All variables for select elments DOM.
  const contact = document.querySelector('.informations__contact');
  const like = document.querySelectorAll('.cardmedia__icon');
  const likes = document.querySelector('#totalLikes');
  const itemsLightbox = document.querySelectorAll('.cardmedia');
  const totalMedia = Array.from(document.querySelectorAll('.cardmedia')).length;
  const lightboxNav = document.querySelectorAll('.lightbox__navig');
  const lightbox = document.querySelector('.lightbox');
  const main = document.querySelector('main');
  const header = document.querySelector('header');
  const modalClose = document.querySelector('.close');
  const lightboxClose = document.querySelector('.lightbox__close');

  // This variable serve for the lightbox. For know the current Media to display in.
  let currentMedia = 0;

  // This function serve to increase likes for the media and increase the total likes.
  like.forEach((l) => l.addEventListener(
    'click',
    () => {
      l.previousSibling.innerText = parseInt(like.previousSibling.innerText, 10) + 1;
      l.innerText = parseInt(likes.innerText, 10) + 1;
    },
    false,
  ));

  // This is for listen the click on a Media Card and Open the lightbox.
  itemsLightbox.forEach((e) => e.addEventListener(
    'click',
    (event) => {
      event.preventDefault();
      const testy = parseInt(event.target.id, 10);
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(testy)) {
        currentMedia = parseInt(event.target.firstElementChild.id, 10);
      } else {
        currentMedia = parseInt(event.target.id, 10); // get id of the element Photo or Video.
      }
      openLightbox(); // Call function for Open the Lightbox.
    },
    false,
  ));

  // For close the lightbox
  lightboxClose.addEventListener('click', closeLightbox, false);

  // For nav elements of lightbox. On click call the incdecMedia function
  // (for increase or decrease) and call the function lightboxCar() for display new media.
  lightboxNav.forEach(
    (nav) => nav.addEventListener('click', () => {
      if (nav.parentElement.id === 'left') {
        incdecMedia('minus');
        lightboxCar();
      } else if (nav.parentElement.id === 'right') {
        incdecMedia('plus');
        lightboxCar();
      }
    }),
    false,
  );

  // Open the lightbox
  function openLightbox() {
    lightbox.style.display = 'flex';
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'true');
    header.setAttribute('aria-hidden', 'true');
    document.querySelector('#left').focus();
    lightboxCar();
    if (currentMedia === 0) {
      document.querySelector('.fa-chevron-left').style.color = 'grey';
    } else {
      document.querySelector('.fa-chevron-left').style.color = '#901c1c';
    }
    if (currentMedia === totalMedia - 1) {
      document.querySelector('.fa-chevron-right').style.color = 'grey';
    } else {
      document.querySelector('.fa-chevron-right').style.color = '#901c1c';
    }
  }

  // close the lightbox
  function closeLightbox() {
    lightbox.style.display = 'none';
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    main.setAttribute('aria-hidden', 'false');
    header.setAttribute('aria-hidden', 'false');
  }

  // For open the form modal when client on contact button.
  contact.addEventListener('click', openModal, false);

  // For detect button pressed. Escape for close modal and lightbox.
  // ArrowLeft and ArrowRight for navigate on medias in lightbox.
  window.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Escape') {
        closeModal();
        closeLightbox();
      }

      if (e.key === 'ArrowLeft') {
        if (lightbox.classList.contains('active')) {
          incdecMedia('minus');
          lightboxCar();
        }
      }
      if (e.key === 'ArrowRight') {
        if (lightbox.classList.contains('active')) {
          incdecMedia('plus');
          lightboxCar();
        }
      }
      if (e.key === 'Enter') {
        const focused = document.activeElement;
        if (document.querySelector('#left') === focused) {
          incdecMedia('minus');
          lightboxCar();
        }
        if (document.querySelector('#right') === focused) {
          incdecMedia('plus');
          lightboxCar();
        }
        if (lightboxClose === focused) {
          closeLightbox();
        }
        if (modalClose === focused) {
          closeModal();
        }
      }
    },
    true,
  );

  // This function serve to increase or decrease the currentMedia variable.
  function incdecMedia(type) {
    if (type === 'minus') {
      if (currentMedia > 0) {
        currentMedia -= 1;
      }
    } else if (currentMedia < totalMedia - 1) {
      currentMedia += 1;
    }
    // This part are for change the color of chevron in left or right if the medias list is finish.
    if (currentMedia === 0) {
      document.querySelector('.fa-chevron-left').style.color = 'grey';
    } else {
      document.querySelector('.fa-chevron-left').style.color = '#901c1c';
    }
    if (currentMedia === totalMedia - 1) {
      document.querySelector('.fa-chevron-right').style.color = 'grey';
    } else {
      document.querySelector('.fa-chevron-right').style.color = '#901c1c';
    }
  }

  // This function serve to display Photo or Video and the title in the lightbox.
  function lightboxCar() {
    const m = document.getElementById(currentMedia);
    const t = m.parentElement.nextElementSibling.outerText;
    document.querySelector(
      'figure',
    ).innerHTML = `${m.outerHTML}<figcaption>${t}</figcaption>`;
    if (document.querySelector('figure video')) {
      document.querySelector('figure video').setAttribute('controls', '');
    }
  }

  // end function interact
}

// this part contains the form action

const submit = document.querySelector('#submit');
const inputs = document.querySelectorAll('.form__input');

// For display error message when input text.
inputs.forEach(
  (i) => i.addEventListener('input', () => {
    if (i.validity.valid === false) {
      i.nextElementSibling.style.display = 'inline';
    } else {
      i.nextElementSibling.style.display = 'none';
    }
  }),
  false,
);

// Validate the form when click on button submit
function validate() {
  // Variables for select all inputs and form
  const form = document.querySelector('form');

  // Check for form validity
  if (form.checkValidity() === false) {
    inputs.forEach((e) => {
      if (e.validity.valid === false) {
        e.nextElementSibling.style.display = 'inline';
        e.style.border = '2px solid red';
      } else {
        e.nextElementSibling.style.display = 'none';
        e.setAttribute('aria-invalid', 'false');
        e.style.border = '2px solid green';
      }
    });
  } else {
    inputs.forEach((e) => {
      console.log(e.value);
    });

    form.reset();

    inputs.forEach((e) => {
      e.nextElementSibling.style.display = 'none';
      modal.style.display = 'none';
    });
  }

  // for keep form on screen when submit
  return false;
}

// On click on send button call the function validate.
if (submit !== undefined) {
  submit.addEventListener('click', validate, false);
}

// This part contains all other interact

const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const header = document.querySelector('header');
const main = document.querySelector('main');

// Close modal event
if (modalClose !== undefined) {
  modalClose.addEventListener('click', closeModal, false);
}

// Open modal form
function openModal() {
  modal.style.display = 'block';
  inputs[0].focus();
  modal.setAttribute('aria-hidden', 'false');
  header.setAttribute('aria-hidden', 'true');
  main.setAttribute('aria-hidden', 'true');
}

// close the modal
function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  header.setAttribute('aria-hidden', 'false');
  main.setAttribute('aria-hidden', 'false');
}

// function for display button "Passer au contenu" in Home Page when scrool down
function interactHome() {
  function displayBtnContent() {
    contentBtn.style.display = 'block';
    contentBtn.setAttribute('aria-hidden', 'false');
  }
  window.addEventListener('scroll', displayBtnContent, false);
}
