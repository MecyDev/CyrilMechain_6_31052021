/**
 * The class who represent a Photo
 */

class Photo extends Media {
  constructor(media, count) {
    super(media);
    this.image = media.image;
    this.count = count;
  }

  //Function for generate the Media Card Photo of Photograph.
  get makeCard() {
    const display = `
    <article class="cardmedia" >
      <a href="./medias/${this.photographerId}/${this.image}" class="lightbox-item">
        <img src="./medias/${this.photographerId}/mini/${this.image}" alt="${this.title}, closeup view" class="lightbox__img" id="${this.count}">
      </a>
      <p class="cardmedia__title">${this.title}</p>
      <p class="cardmedia__likes">${this.likes}</p><i class="fas fa-heart cardmedia__icon" aria-label="likes"></i>
    </article>`;
    return display;
  }
}
