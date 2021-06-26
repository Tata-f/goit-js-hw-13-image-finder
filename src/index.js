import photoCard from './templates/photo-card.hbs'
import ApiService from './javascript/apiService';
import {info} from './javascript/notification'
import './css/styles.css';

const $searchForm = document.querySelector('.search-form');
const $loadMoreBtn = document.querySelector('[data-action="load-more"]');
const $gallery = document.querySelector('.gallery');

const apiService = new ApiService();

$searchForm.addEventListener('submit', onSearchForm);
$loadMoreBtn.addEventListener('click', onLoadMore);

function onSearchForm(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;

  if(apiService.query === '') {
     return info('Что будем искать?')
      
  }

  clearGallery();
  apiService.resetPage();
  apiService.fetchPhotoCards().then(appendPhotoCardMarkup);
}

function onLoadMore() {
  apiService.fetchPhotoCards().then(appendPhotoCardMarkup);
  $gallery.scrollIntoView({block: "end", behavior: "smooth"});
}

function appendPhotoCardMarkup(hits) {
    $gallery.insertAdjacentHTML('beforeend', photoCard(hits) )
}

function clearGallery() {
    $gallery.innerHTML = '';
}