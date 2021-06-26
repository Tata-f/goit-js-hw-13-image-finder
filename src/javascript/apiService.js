const API_KEY = '22244743-3bbc0ffbb79634951ed888424';
const BASE_URL = 'https://pixabay.com/api';

export default class ApiService {
  constructor() {
    this.searchQuery = '', 
    this.page = 1;
  }

  fetchPhotoCards() {   
   return fetch(

      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
    )
      .then(response => response.json())
      .then(({hits}) => {
        this.incrementPage()
             return hits; 
      });


  }

  incrementPage() {
      this.page += 1;
  }

  resetPage() {
      this.page = 1;
  }

}
