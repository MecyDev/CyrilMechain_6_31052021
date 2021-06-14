const url = `http://${window.location.host}/js/json/FishEyeData.json`;
const photograph = window.location.search;
const tags = document.querySelectorAll(".tag");
let listTags = [];

const param = new URLSearchParams(photograph);

if (param.has("photograph")) {
  const photographId = param.get("photograph");
  let photographers = new PhotographManager(url, [], photographId);
} else {
  let photographers = new PhotographManager(url, listTags);
}

tags.forEach(
  (tag) =>
    tag.addEventListener("click", function () {
      let tagName = tag.querySelector("span").innerHTML.toLowerCase();
      if (tag.classList.contains("tag--select") == false) {
        tag.classList.add("tag--select");
        listTags.push(tagName);
        console.log(listTags);
        photographers = new PhotographManager(url, listTags);
      } else {
        tag.classList.remove("tag--select");
        listTags = listTags.filter((i) => i !== tagName);
        console.log(listTags);
        photographers = new PhotographManager(url, listTags);
      }
    }),
  false
);
