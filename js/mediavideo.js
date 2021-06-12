class MediaVideo extends Media {
  constructor(media) {
    super(media);
    this.video = media.video;
  }

  makeMedia() {
    return new Video(this.video);
  }
}
