import photoCard from '../templates/photo-card.hbs';
import ApiService from './apiService';

import { info } from '../javascript/notification';
import * as basicLightbox from 'basiclightbox';

const $searchForm = document.querySelector('.search-form');
const $loadMoreBtn = document.querySelector('[data-action="load-more"]');
const $gallery = document.querySelector('.gallery');

const apiService = new ApiService();

$searchForm.addEventListener('submit', onSearchForm);
$loadMoreBtn.addEventListener('click', onLoadMore);
$gallery.addEventListener('click', onImageClick);

function onSearchForm(e) {
  e.preventDefault();

  apiService.searchQuery = e.currentTarget.elements.query.value.trim();

  if (apiService.searchQuery === '') {
    return info.showToast();
  }

  clearGallery();
  apiService.resetPage();
  apiService.fetchPhotoCards().then(appendPhotoCardMarkup);
}

function onLoadMore() {
  apiService.fetchPhotoCards().then(appendPhotoCardMarkup).then(scrollToEnd);

}

function appendPhotoCardMarkup(hits) {
  $gallery.insertAdjacentHTML('beforeend', photoCard(hits));
  if(hits.length !==0) {
    $loadMoreBtn.classList.remove('is-hidden')
  } 
}

function clearGallery() {
  $gallery.innerHTML = '';
}

function onImageClick(e) {
  const largeImage = e.target.dataset.source;
  if (e.target.className !== 'image') return;

  const instance = basicLightbox.create(` <img src="${largeImage}">`).show();
}

function scrollToEnd() {
  $gallery.scrollIntoView({ block: 'end', behavior: 'smooth' })
}

