/***
 * Class for display and sort photgraphers
 */

class PhotographManager {
  constructor(url) {
    this.url = url;
    const listPhotograph = [];
    this.listPhotograph = listPhotograph;
    const jsonData = this.jData(this.url);
    this.jsonData = jsonData;
  }

  async jData(url) {
    const response = await fetch(url);

    if (response.status >= 200 && response.status < 300) {
      const data = await response.json();
      return data;
    } else {
      console.error(response);
    }
  }

  getAllPhotograph() {
    this.jsonData.then((photographers) => {
      for (let photographer of photographers.photographers) {
        let list = [];
        for (let media of photographers.media) {
          if (media.photographerId === photographer.id) {
            list.push(media);
          }
        }
        photographer.medias = list;
        const photograph = new Photograph(photographer);
        this.displayPhotographCard(photograph);
      }
    });
  }

  getAllPhotographByTags(tags) {
    document.querySelector("main").innerHTML = "";
    this.jsonData.then((photographers) => {
      for (let photographer of photographers.photographers) {
        let list = [];
        for (let media of photographers.media) {
          if (media.photographerId === photographer.id) {
            list.push(media);
          }
        }
        photographer.medias = list;
        if (this.filterByTag(tags, photographer.tags)) {
          const photograph = new Photograph(photographer);
          this.displayPhotographCard(photograph);
        }
      }
    });
  }

  getPhotographById(id) {
    this.jsonData.then((photographers) => {
      for (let photographer of photographers.photographers) {
        if (photographer.id == id) {
          let list = [];
          for (let media of photographers.media) {
            if (media.photographerId === photographer.id) {
              list.push(media);
            }
          }
          photographer.media = list;
          const photograph = new Photograph(photographer);
          this.displayPhotograph(photograph);
          photograph.medias;
        }
      }
    });
  }

  displayPhotographCard(photograph) {
    document.querySelector("main").innerHTML += photograph.card;
  }

  displayPhotograph(photograph) {
    document.querySelector(".informations").innerHTML += photograph.information;
    document.querySelector(".modal__header").innerHTML +=
      photograph.namePhotograph;
  }

  filterByTag(ListTags, phTags) {
    const find = listTags.every((tag) => {
      if (phTags.includes(tag) || phTags.includes(this.without(tag))) {
        return true;
      }
    });

    if (find === true) {
      return true;
    }
    return false;
  }

  without(w) {
    return w + "s";
  }
  /*end Class*/
}
