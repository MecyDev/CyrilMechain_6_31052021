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
    this.media = photograph.medias;
  }

  get namePhotograph() {
    return this.name;
  }

  get priceDay() {
    return this.price;
  }

  get card() {
    const card = `<div class="card" id=${this.id}>
        <a class="card__link" href="http://${
          window.location.host
        }/page.html?photograph=${this.id}">
          <img class="card__img" src="./medias/Photo-id/${
            this.portrait
          }" alt="" />
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

  get information() {
    const information = `
    <div class="informations__container">
      <h1 class="informations__header">${this.name}</h1>
      <p class="informations__geo">${this.city}, ${this.country}</p>
      <p class="informations__tagline">${this.tagline}</p>
      <div class="btn btn--desktop informations__contact">Contactez-moi</div>
      <ul class="inline inline--nocenter">
    ${this.tags
      .map(function (e) {
        return `<li class="tag tag--large"><strong>#${e}</strong></li>`;
      })
      .join("")}
    </ul>
    </div>
    <p class="informations__contImg"><img class="informations__img" src="./medias/Photo-id/${
      this.portrait
    }" alt="${this.name}" /></p>`;
    return information;
  }

  get totalLikes() {
    let total = 0;
    this.media.forEach((e) => {
      total += e.likes;
    });
    return total;
  }

  /*End Class*/
}
