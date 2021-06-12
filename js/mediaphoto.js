class MediaPhoto extends Media {
  constructor(media) {
    super(media);
    this.media = media;
  }

  makeMedia() {
    return new Photo(this.media);
  }
}
