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
    <article>
      <a>
        <img src="./medias/${this.photographerId}/video/thumbnail.jpg" alt="">
      </a>
    </article>`;
    return display;
  }
}
