fetch("http://127.0.0.1:5500/js/json/FishEyeData.json")
  .then((data) => data.json())
  .then((jsonPhotographers) => {
    for (let jsonPhotograph of jsonPhotographers.photographers) {
      let photograph = new Photograph(jsonPhotograph);
      document.querySelector("main").innerHTML += `
      <div class="card">
        <a class="card__link" href="#">
          <img class="card__img" src="./img/Photo-id/${
            photograph.portrait
          }" alt="" />
          <h2 class="card__h2">${photograph.name}</h2>
        </a>
        <p class="card__from">${photograph.city}, ${photograph.country}</p>
        <p class="card__tagline"><strong>${photograph.tagline}</strong></p>
        <p class="card__price">${photograph.price}€/jour</p>
        <ul class="inline">
        ${photograph.tags
          .map(function (e) {
            return `<li class="tag"><strong>#${e}</strong></li>`;
          })
          .join("")}
        </ul>
      </div>
      `;
    }
  });
