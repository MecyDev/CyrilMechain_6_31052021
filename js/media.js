/**
 * The factory class for generate photo or video object
 */

class Media {
  constructor(media) {
    this.id = media.id;
    this.photographerId = media.photographerId;
    this.title = media.title;
    this.tags = media.tags;
    this.likes = media.likes;
    this.date = media.date;
    this.price = media.price;
  }

  takeMedia() {
    const mediaType = this.makeMedia();
    mediaType.makeCard();
  }
}
