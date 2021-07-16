/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/**
 * The class who represent a Video
 */

class Video extends Media {
  constructor(media, count) {
    super(media);
    this.video = media.video;
    this.count = count;
  }

  // Function for generate the Media Card Video of Photograph.
  get makeCard() {
    const display = `
    <article class="cardmedia">
      <a href="./medias/${this.photographerId}/video/${this.video}" class="lightbox-item">
        <video src="./medias/${this.photographerId}/video/${this.video}" poster="./medias/${this.photographerId}/video/thumbnail.jpg" class="lightbox__img" id="${this.count}">
        </video>
      </a>
      <p class="cardmedia__title">${this.title}</p>
      <p class="cardmedia__likes">${this.likes}</p><i class="fas fa-heart cardmedia__icon" aria-label="likes"></i>
    </article>`;
    return display;
  }
}
