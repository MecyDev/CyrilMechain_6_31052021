/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
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

  // Function for sort Medias by Popularity, Date or Title
  tri(type) {
    switch (type) {
      case 'Popularité':
        this.media.sort((a, b) => (parseInt(b.likes, 10) > parseInt(a.likes, 10) ? 1 : -1));
        return this.media;
      case 'Date':
        this.media.sort((a, b) => (a.date > b.date ? 1 : -1));
        return this.media;
      case 'Titre':
        this.media.sort((a, b) => (a.title > b.title ? 1 : -1));
        return this.media;
      default:
        return false;
    }
  }

  // Function for generate Photograph Card on Home Page
  get card() {
    const card = `<div class="card" id=${this.id} aria-description="${
      this.name
    }">
        <a class="card__link" href="http://${
  window.location.host
}/page.html?photograph=${this.id}">
          <img class="card__img" src="./medias/Photo-id/${
  this.portrait
}" alt="${this.name}" />
          <h2 class="card__h2">${this.name}</h2>
        </a>
        <p class="card__from">${this.city}, ${this.country}</p>
        <p class="card__tagline"><strong>${this.tagline}</strong></p>
        <p class="card__price">${this.price}€/jour</p>
        <ul class="inline">
        ${this.tags
    .map((e) => `<li class="tag tag--card"><a href="index.html?tag=${e}" aria-hidden="true">#${e}</a><span class="sr-only">${e}</span></li>`)
    .join('')}
        </ul>
      </div>`;
    return card;
  }

  // Function for generate the information of Photograph for Photograph Page.
  get information() {
    const information = `
    <div class="informations__container">
    <div class="informations__cobut">
      <h1 class="informations__header">${this.name}</h1>
      <button type="btn" class="btn btn--desktop informations__contact" aria-label="contactez-moi">Contactez-moi</button>
    </div>
      <p class="informations__geo">${this.city}, ${this.country}</p>
      <p class="informations__tagline">${this.tagline}</p>
      <ul class="inline inline--nocenter">
      ${this.tags
    .map((e) => `<li class="tag tag--large"><span class="sr-only">${e}</span><a href="index.html?tag=${e}" aria-hidden="true">#${e}</a></li>`)
    .join('')}
      </ul>
      </div>
    <p class="informations__contImg"><img class="informations__img" src="./medias/Photo-id/${
  this.portrait
}" alt="${this.name}" /></p>`;
    return information;
  }

  // function for calculate all likes
  get totalLikes() {
    let total = 0;
    this.media.forEach((e) => {
      total += e.likes;
    });
    return total;
  }

  /* End Class */
}
