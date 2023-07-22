export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like');

    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__trash').addEventListener('click', () => this._handleTrashClick());
    this._likeButton.addEventListener('click', () => this._handleLikeClick());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  _handleTrashClick() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle('card__like_active');
  }

}
