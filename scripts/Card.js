import {openPopup} from "./index.js";

const popupCardEl = document.querySelector('#card-popup');
const popupCardFigcaptionEl = popupCardEl.querySelector('.popup__figcaption');
const popupCardImageEl = popupCardEl.querySelector('.popup__card-image');

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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

    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__trash').addEventListener('click', () => this._handleTrashClick());
    this._element.querySelector('.card__like').addEventListener('click', () => this._handleLikeClick());
    this._element.querySelector('.card__image').addEventListener('click', () => this._handleImageClick());
  }

  _handleTrashClick() {
    this._element.remove();
  }

  _handleLikeClick() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handleImageClick() {
    popupCardFigcaptionEl.textContent = this._name;
    popupCardImageEl.src = this._link;
    popupCardImageEl.alt = this._name;
    openPopup(popupCardEl);
  }
}
