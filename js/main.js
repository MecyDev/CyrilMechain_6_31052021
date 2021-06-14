const url = `http://${window.location.host}/js/json/FishEyeData.json`;
const tags = document.querySelectorAll(".tag");
let listTags = [];

let photographers = new Photographers(url, listTags);

tags.forEach(
  (tag) =>
    tag.addEventListener("click", function () {
      let tagName = tag.querySelector("span").innerHTML.toLowerCase();
      if (tag.classList.contains("tag--select") == false) {
        tag.classList.add("tag--select");
        listTags.push(tagName);
        console.log(listTags);
        photographers = new Photographers(url, listTags);
      } else {
        tag.classList.remove("tag--select");
        listTags = listTags.filter((i) => i !== tagName);
        console.log(listTags);
        photographers = new Photographers(url, listTags);
      }
    }),
  false
);
