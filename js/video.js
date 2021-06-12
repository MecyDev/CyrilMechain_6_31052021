/**
 * The class who represent a Video
 */

class Video extends Media {
  constructor(media) {
    super(media);
    this.video = media.video;
  }

  makeCard() {
    console.log(`${this.video}`);
  }
}
