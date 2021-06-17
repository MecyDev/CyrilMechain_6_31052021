const url = `http://${window.location.host}/js/json/FishEyeData.json`;
const photograph = window.location.search;
const tags = document.querySelectorAll(".tag");
let listTags = [];

const param = new URLSearchParams(photograph);

if (param.has("photograph")) {
  const photographId = param.get("photograph");
  const photographers = new PhotographManager(url);
  photographers.getPhotographById(photographId);
} else {
  const photographers = new PhotographManager(url);
  photographers.getAllPhotograph();

  tags.forEach(
    (tag) =>
      tag.addEventListener("click", function (event) {
        let tagName = tag.querySelector("span").innerHTML.toLowerCase();
        if (tag.classList.contains("tag--select") == false) {
          tag.classList.add("tag--select");
          listTags.push(tagName);

          photographers.getAllPhotographByTags(listTags);
        } else {
          tag.classList.remove("tag--select");
          listTags = listTags.filter((i) => i !== tagName);
          photographers.getAllPhotographByTags(listTags);
        }
      }),
    false
  );
}
