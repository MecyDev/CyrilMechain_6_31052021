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
    this.media = media;

    this.createMedia = function (type) {
      let media;

      if (type === "photo") {
        media = new Photo(this.media);
      } else if (type === "video") {
        media = new Video(this.media);
      }

      return media;
    };
  }
}
