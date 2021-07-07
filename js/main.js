const url = `http://${window.location.host}/js/json/FishEyeData.json`;
const photograph = window.location.search;
const tags = document.querySelectorAll(".tag");
const select = document.querySelector("#tri-select");
const contentBtn = document.querySelector(".btn--content");
let listTags = [];
let ListMedia;
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
} else {
  displayPhotograph();

  window.addEventListener("scroll", displayBtnContent, false);

  function displayBtnContent() {
    contentBtn.style.display = "block";
    contentBtn.setAttribute("aria-hidden", "false");
  }

  tags.forEach(
    (tag) =>
      tag.addEventListener("click", function (event) {
        let tagName = tag.querySelector("span").innerHTML.toLowerCase();
        if (tag.classList.contains("tag--select") == false) {
          tag.classList.add("tag--select");
          listTags.push(tagName);
          displayPhotograph();
        } else {
          tag.classList.remove("tag--select");
          listTags = listTags.filter((i) => i !== tagName);
          displayPhotograph();
        }
      }),
    false
  );
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
  const find = listTags.every((tag) => {
    if (phTags.includes(tag) || phTags.includes(this.without(tag))) {
      return true;
    }
  });

  if (find === true) {
    return true;
  }
  return false;
}

function without(w) {
  return w + "s";
}

function factory(type, e) {
  switch (type) {
    case "photo":
      return new Photo(e);
    case "video":
      return new Video(e);
  }
}

function media(m) {
  let media;
  m.forEach((e) => {
    if (e.hasOwnProperty("image")) {
      media = factory("photo", e);
    } else {
      media = factory("video", e);
    }
    document.querySelector(".medias").innerHTML += media.makeCard;
  });
}

function interact() {
  const contact = document.querySelector(".informations__contact");
  const like = document.querySelectorAll(".cardmedia__icon");
  const likes = document.querySelector("#totalLikes");
  const inputs = document.querySelectorAll(".form__input");
  const tt = document.querySelectorAll(".lightbox-item");
  const tags = document.querySelectorAll(".tag");
  ListMedia = Array.from(document.querySelectorAll(".cardmedia"));

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
        console.log("tadaaaa!");
      },
      false
    )
  );

  contact.addEventListener("click", openModal, false);

  tags.forEach(
    (tag) =>
      tag.addEventListener("click", function (event) {
        let tagName = tag.querySelector("span").innerHTML.toLowerCase();
        if (tag.classList.contains("tag--select") == false) {
          tag.classList.add("tag--select");
          listTags.push(tagName);
          displayPhotograph();
        } else {
          tag.classList.remove("tag--select");
          listTags = listTags.filter((i) => i !== tagName);
          displayPhotograph();
        }
      }),
    false
  );
}
