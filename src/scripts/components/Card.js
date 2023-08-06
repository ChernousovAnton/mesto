export default class Card {
  constructor(data, templateSelector, handleCardClick, handleTrashClick, sendLikeRequest, myId) {
    this._name = data.name;
    this._link = data.link;
    this._myId = myId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._likesCount = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._sendLikeRequest = sendLikeRequest;
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
    if (this._ownerId === this._myId) this._cardTrashEl.classList.add('card__trash_active')

    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._likeCountEl.textContent = this._likesCount;

    for (like of this._likes) {
      if (like._id === this._myId) {
        this._likeButtonEl.classList.add('card__like_active');
        break;
      }
    }

    return this._element;
  }

  _setEventListeners() {
    this._cardTrashEl.addEventListener('click', () => this._handleTrashClick(this._cardId, this._element));
    this._likeButtonEl.addEventListener('click', () => this._handleLikeClick());
    this._cardImageEl.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  _handleLikeClick() {
    if (this._likeButtonEl.classList.contains('card__like_active')) {
      this._sendLikeRequest(this._cardId, 'makeInactive')
        .then(json => {
          this._likeCountEl.textContent = json.likes.length;
          this._likeButtonEl.classList.remove('card__like_active');
        })
        .catch(err => console.error(err));
    } else {
      this._sendLikeRequest(this._cardId, 'makeActive')
        .then(json => {
          this._likeCountEl.textContent = json.likes.length;
          this._likeButtonEl.classList.add('card__like_active');
        })
        .catch(err => console.error(err));
    }
  }

}
