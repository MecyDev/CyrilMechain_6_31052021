/**
 * The class who represent a Photo
 */

class Photo extends Media {
  constructor(media) {
    super(media);
    this.image = media.image;
  }

  makeCard() {
    const display = `
    <article class="cardmedia">
      <a>
        <img src="./medias/${this.photographerId}/mini/${this.image}" alt="">
      </a>
      <p class="cardmedia__title">${this.title}</p>
      <p class="cardmedia__likes">${this.likes}</p><i class="fas fa-heart cardmedia__icon"></i>
    </article>`;
    return display;
  }
}
