const host = window.location.host;
const promiseFetchJson = fetch(`http://${host}/js/json/FishEyeData.json`);
const tags = document.querySelectorAll(".tag");
let listTags = [];

tags.forEach(
  (tag) =>
    tag.addEventListener("click", function () {
      let tagName = tag.querySelector("span").innerHTML.toLowerCase();
      if (tag.classList.contains("tag--select") == false) {
        tag.classList.add("tag--select");
        listTags.push(tagName);
        console.log(listTags);
      } else {
        tag.classList.remove("tag--select");
        listTags = listTags.filter((i) => i !== tagName);
        console.log(listTags);
      }
    }),
  false
);

console.log(getPhotographers());

function getData() {
  return promiseFetchJson.then((data) => data.json());
}

/*function getPhotographers() {
  getData().then((jsonPhotographers) => {
    for (let jsonPhotograph of jsonPhotographers.photographers) {
      const photograph = new Photograph(jsonPhotograph);
      displayPhotographer(photograph);
    }
  });
}*/

/*function getPhotographers() {
  getData().then((jsonPhotographers) => {
    for (let jsonPhotograph of jsonPhotographers.photographers) {
      let list = [];
      for (let jsonMedia of jsonPhotographers.media) {
        if (jsonMedia.photographerId === jsonPhotograph.id) {
          if (jsonMedia.hasOwnProperty("image")) {
            const media = new MediaPhoto();
            console.log(media.takeMedia());
          } else {
            const media = new MediaVideo();
            console.log(media.takeMedia());
          }
        }
      }
    }
  });
}*/

function getPhotographers() {
  getData().then((jsonPhotographers) => {
    for (let jsonPhotograph of jsonPhotographers.photographers) {
      let list = [];
      for (let jsonMedia of jsonPhotographers.media) {
        if (jsonMedia.photographerId === jsonPhotograph.id) {
          list.push(jsonMedia);
        }
      }
      const photograph = new Photograph(jsonPhotograph, list);
      displayPhotographer(photograph);
    }
  });
}

function displayPhotographer(listPhotographers) {
  document.querySelector("main").innerHTML += listPhotographers.card;
}
