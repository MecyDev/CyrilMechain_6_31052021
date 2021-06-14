/***
 * Class for display and sort photgraphers
 */

class Photographers {
  constructor(url, listTags) {
    this.url = url;
    this.tags = listTags;
    const jsonData = this.jData(this.url);
    this.getPhotographers(jsonData);
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

  getPhotographers(data) {
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
