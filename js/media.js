/**
 * The factory class for generate photo or video object
 */

class Media {
  takeMedia() {
    const mediaType = this.makeMedia();
    mediaType.makeCard();
  }
}
