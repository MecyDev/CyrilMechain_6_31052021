/**
 * The class who represent a Video
 */

class Video extends Media {
  constructor(media) {
    super(media);
    this.video = media.video;
  }

  makeCard() {
    const display = `
    <article class="cardmedia">
      <a>
        <img src="./medias/${this.photographerId}/video/thumbnail.jpg" alt="">
        <p class="cardmedia__title">${this.title}</p>
        <p class="cardmedia__likes">${this.likes}</p><i class="fas fa-heart cardmedia__icon"></i>
      </a>
    </article>`;
    return display;
  }
}
