const url = `http://${window.location.host}/js/json/FishEyeData.json`;
const photograph = window.location.search;

const select = document.querySelector("#tri-select");
const contentBtn = document.querySelector(".btn--content");
let tag = "";
let listTags = [];
let triType = "Popularité";

const param = new URLSearchParams(photograph);

const jsonData = jData(url);

if (param.has("photograph")) {
  const photographId = param.get("photograph");
  let test = displayPhotograph(photographId).then(() => {
    interact();
  });

  select.addEventListener(
    "change",
    function () {
      triType = select.value;
      document.querySelector(".informations").innerHTML = "";
      document.querySelector(".medias").innerHTML = "";
      document.querySelector(".recall").innerHTML = "";
      document.querySelector(".modal__header").innerHTML = "Contactez-moi ";

      test = displayPhotograph(photographId).then(() => {
        interact();
      });
    },
    false
  );
} else if (param.has("tag")) {
  tag = param.get("tag");

  displayPhotograph().then(() => {
    const tagSelect = document.querySelectorAll(".tag");

    tagSelect.forEach((e) => {
      if (e.querySelector("span").innerText.toLocaleLowerCase() === tag) {
        if (!e.classList.contains("tag--select"))
          e.classList.add("tag--select");
      }
    }, false);

    //end then
  });

  //end else if
} else {
  displayPhotograph().then(() => {
    interactHome();
  });
}

async function jData(url) {
  const response = await fetch(url);

  if (response.status >= 200 && response.status < 300) {
    const data = await response.json();
    return data;
  } else {
    console.error(response);
  }
}

function displayPhotograph(id) {
  if (id === undefined) {
    document.querySelector("main").innerHTML = "";
  }

  const result = jsonData.then((jsonListPhotograph) => {
    for (let jsonPhotograph of jsonListPhotograph.photographers) {
      let list = [];
      for (let media of jsonListPhotograph.media) {
        if (media.photographerId === jsonPhotograph.id) {
          list.push(media);
        }
      }

      jsonPhotograph.medias = list;

      if (id === undefined && filterByTag(jsonPhotograph.tags)) {
        const photograph = new Photograph(jsonPhotograph);
        document.querySelector("main").innerHTML += photograph.card;
      } else {
        if (jsonPhotograph.id == id) {
          const photograph = new Photograph(jsonPhotograph);
          document.querySelector(".informations").innerHTML +=
            photograph.information;
          media(photograph.tri(triType));
          document.querySelector(".modal__header").innerHTML += photograph.name;
          document.querySelector(".recall").innerHTML += `
          <p id="totalLikes">${photograph.totalLikes}</p><i class="fas fa-heart recall__icon"></i>
          <p>${photograph.priceDay}€ / jour</p>
          `;
        }
      }
    }
  });

  return result;
}

function filterByTag(phTags) {
  if (tag === "") {
    return true;
  }

  const find = phTags.includes(tag);

  if (find == true) {
    return true;
  }
  return false;
}

function factory(type, e, c) {
  switch (type) {
    case "photo":
      return new Photo(e, c);
    case "video":
      return new Video(e, c);
  }
}

function media(m) {
  let media;
  let c = 1;
  m.forEach((e) => {
    if (e.hasOwnProperty("image")) {
      media = factory("photo", e, c);
    } else {
      media = factory("video", e, c);
    }
    document.querySelector(".medias").innerHTML += media.makeCard;
    c++;
  });
}

function interact() {
  const contact = document.querySelector(".informations__contact");
  const like = document.querySelectorAll(".cardmedia__icon");
  const likes = document.querySelector("#totalLikes");
  const inputs = document.querySelectorAll(".form__input");
  const tt = document.querySelectorAll(".lightbox-item");
  const tags = document.querySelectorAll(".tag--card");
  const nav = document.querySelector("nav");
  const totalMedia = Array.from(document.querySelectorAll(".cardmedia")).length;

  /*ListMedia.forEach((m) => {
    if (m.querySelector("img")) {
      console.log(m.querySelector("img").src);
    } else {
      console.log("video");
    }
  }, false);*/

  like.forEach((like) =>
    like.addEventListener(
      "click",
      function () {
        like.previousSibling.innerText =
          parseInt(like.previousSibling.innerText) + 1;
        likes.innerText = parseInt(likes.innerText) + 1;
      },
      false
    )
  );

  tt.forEach((e) =>
    e.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        openLightbox(event.target.outerHTML);
      },
      false
    )
  );

  contact.addEventListener("click", openModal, false);

  //Open the lightbox
  function openLightbox(e) {
    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "true");
    header.setAttribute("aria-hidden", "true");
    document.querySelector("figure").innerHTML = e;
    if (document.querySelector("figure video")) {
      document.querySelector("figure video").setAttribute("controls", "");
    }
  }
}

//

function interactHome() {
  const tags = document.querySelectorAll(".tag");
  window.addEventListener("scroll", displayBtnContent, false);

  function displayBtnContent() {
    contentBtn.style.display = "block";
    contentBtn.setAttribute("aria-hidden", "false");
  }
}
