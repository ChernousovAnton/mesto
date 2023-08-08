export default class Card {
  constructor(data, templateSelector, handleCardClick, handleTrashClick, handleLikeClick, myId) {
    this._name = data.name;
    this._link = data.link;
    this._myId = myId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
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
    this._cardImageEl = this._element.querySelector('.card__image');
    this._likeButtonEl = this._element.querySelector('.card__like');
    this._likeCountEl = this._element.querySelector('.card__like-count');
    this._cardTrashEl = this._element.querySelector('.card__trash');
    if (this._ownerId === this._myId) this._cardTrashEl.classList.add('card__trash_active');

    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._likeCountEl.textContent = this._likesCount;

    this._toggleCardLike(this._likes);

    return this._element;
  }

  _setEventListeners() {
    this._cardTrashEl.addEventListener('click', () => this._handleTrashClick(this));
    this._likeButtonEl.addEventListener('click', () => this._handleLikeClick(this._isLiked(), this.getCardId(), this._toggleCardLike.bind(this)));
    this._cardImageEl.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  _isLiked() {
    return this._likes.some((like) => like._id === this._myId);
  }

  _toggleCardLike(likesData) {
    this._likeCountEl.textContent = likesData.length;
    this._likes = likesData;
    if (this._isLiked()) {
      this._likeButtonEl.classList.add('card__like_active');
    } else {
      this._likeButtonEl.classList.remove('card__like_active');
    }
  }

  removeCardElement() {
    this._element.remove();
    this._element = null;
  }

  getCardId() {
    return this._cardId;
  }
}
