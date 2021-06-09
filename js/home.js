const host = window.location.host;

fetch(`http://${host}/js/json/FishEyeData.json`)
  .then((data) => data.json())
  .then((jsonPhotographers) => {
    for (let jsonPhotograph of jsonPhotographers.photographers) {
      const photograph = new Photograph(jsonPhotograph);
      document.querySelector("main").innerHTML += photograph.card;
    }
  });

const tags = document.querySelectorAll(".tag");
let listTags = [];

tags.forEach(
  (tag) =>
    tag.addEventListener("click", function () {
      listTags.push("test");
    }),
  false
);

console.log(listTags);
