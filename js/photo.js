/**
 * The class who represent a Photo
 */

class Photo extends Media {
  constructor(media, count) {
    super(media);
    this.image = media.image;
    this.count = count;
  }

  get makeCard() {
    const display = `
    <article class="cardmedia" id="${this.count}">
      <a href="./medias/${this.photographerId}/${this.image}" class="lightbox-item">
        <img src="./medias/${this.photographerId}/mini/${this.image}" alt="${this.title}, closeup view" class="lightbox__img">
      </a>
      <p class="cardmedia__title">${this.title}</p>
      <p class="cardmedia__likes">${this.likes}</p><i class="fas fa-heart cardmedia__icon" aria-label="likes"></i>
    </article>`;
    return display;
  }
}
