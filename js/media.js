/**
 * The parent Class for Class Photo and Class Video
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
  }

  get makeCard() {
    return "Aucuns medias !";
  }
}
