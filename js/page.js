const photograph = window.location.search;

const param = new URLSearchParams(photograph);

if (param.has("photograph")) {
  const photographId = param.get("photograph");
  let photographers = new PhotographPage(photographId);
} else {
  console.log("error");
}
