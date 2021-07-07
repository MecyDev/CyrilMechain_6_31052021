/**
 * The class who represent a Photo
 */

class Photo extends Media {
  constructor(media) {
    super(media);
    this.image = media.image;
  }

  get makeCard() {
    const display = `
    <article class="cardmedia">
      <a href="./medias/${this.photographerId}/${this.image}" class="lightbox-item">
        <img src="./medias/${this.photographerId}/mini/${this.image}" alt="${this.title}">
      </a>
      <p class="cardmedia__title">${this.title}</p>
      <p class="cardmedia__likes">${this.likes}</p><i class="fas fa-heart cardmedia__icon"></i>
    </article>`;
    return display;
  }
}
