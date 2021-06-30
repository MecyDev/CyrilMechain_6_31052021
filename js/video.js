/**
 * The class who represent a Video
 */

class Video extends Media {
  constructor(media) {
    super(media);
    this.video = media.video;
  }

  get makeCard() {
    const display = `
    <article class="cardmedia">
    <a href="./medias/${this.photographerId}/video/${this.video}" class=".lightbox-item">
        <img src="./medias/${this.photographerId}/video/thumbnail.jpg" alt="">
        </a>
        <p class="cardmedia__title">${this.title}</p>
        <p class="cardmedia__likes">${this.likes}</p><i class="fas fa-heart cardmedia__icon"></i>
    </article>`;
    return display;
  }
}
