import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupCarImageEl = this._popupEl.querySelector('.popup__card-image');
  }

  open(name, link) {
    this._popupEl.querySelector('.popup__figcaption').textContent = name;
    this._popupCarImageEl.src = link;
    this._popupCarImageEl.alt = name;
    super.open();
  }
}