/**
 * The class who represent a Photo
 */

class Photo extends Media {
  constructor(media) {
    super(media);
    this.image = media.image;
  }

  makeCard() {
    console.log(this.image);
    const display = `<article><a><img src="./medias/${this.photographerId}/mini/${this.image}" alt=""></a></article>`;
    return display;
  }
}
