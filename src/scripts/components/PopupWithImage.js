import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(name, link) {
    this._popupEl.querySelector('.popup__figcaption').textContent = name;
    this._popupEl.querySelector('.popup__card-image').src = link;
    this._popupEl.querySelector('.popup__card-image').alt = name;
    super.open();
  }
}