/**
 * The class who represent a Photograph
 */

class Photograph {
  constructor(photograph) {
    this.id = photograph.id;
    this.name = photograph.name;
    this.city = photograph.city;
    this.country = photograph.country;
    this.tags = photograph.tags;
    this.tagline = photograph.tagline;
    this.price = photograph.price;
    this.portrait = photograph.portrait;
  }

  get card() {
    const card = `<div class="card" id=${this.id}>
        <a class="card__link" href="#">
          <img class="card__img" src="./img/Photo-id/${this.portrait}" alt="" />
          <h2 class="card__h2">${this.name}</h2>
        </a>
        <p class="card__from">${this.city}, ${this.country}</p>
        <p class="card__tagline"><strong>${this.tagline}</strong></p>
        <p class="card__price">${this.price}€/jour</p>
        <ul class="inline">
        ${this.tags
          .map(function (e) {
            return `<li class="tag"><strong>#${e}</strong></li>`;
          })
          .join("")}
        </ul>
      </div>`;

    return card;
  }
}
