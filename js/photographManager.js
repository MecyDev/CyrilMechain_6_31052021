/***
 * Class for display and sort photgraphers
 */

class PhotographManager {
  constructor(url, listTags, photographId) {
    this.url = url;
    this.tags = listTags;
    this.id = photographId;
    const jsonData = this.jData(this.url);
    if (photographId === undefined) {
      this.getPhotographers(jsonData);
    }
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

  getPhotographers(data, id) {
    document.querySelector("main").innerHTML = "";
    data.then((photographers) => {
      for (let photographer of photographers.photographers) {
        let list = [];
        for (let media of photographers.media) {
          if (media.photographerId === photographer.id) {
            list.push(media);
          }
        }
        if (this.sortByTag(photographer.tags)) {
          const photograph = new Photograph(photographer, list);
          this.displayPhotograph(photograph);
        }
      }
    });
  }

  displayPhotograph(photograph) {
    document.querySelector("main").innerHTML += photograph.card;
  }

  sortByTag(phTags) {
    const find = this.tags.every((tag) => {
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
