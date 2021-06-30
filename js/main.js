const url = `http://${window.location.host}/js/json/FishEyeData.json`;
const photograph = window.location.search;

const tags = document.querySelectorAll(".tag");
let listTags = [];

const param = new URLSearchParams(photograph);

const jsonData = jData(url);

if (param.has("photograph")) {
  const photographId = param.get("photograph");

  displayPhotograph(photographId).then(() => {
    const contact = document.querySelector(".informations__contact");
    const arrMedia = Array.from(document.querySelectorAll(".cardmedia"));

    contact.addEventListener("click", openModal, false);
  });
} else {
  displayPhotograph();
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
          media(jsonPhotograph.medias);
          document.querySelector(".modal__header").innerHTML += photograph.name;
          document.querySelector(".recall__content").innerHTML += `
          <p>${photograph.totalLikes}<i class="fas fa-heart recall__icon"></i></p>
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
