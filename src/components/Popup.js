export default class Popup {
  constructor(selector) {
    this._popupEl = document.querySelector(selector);
    this._escClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupEl.classList.add('popup_opened');
    document.addEventListener('keydown', this._escClose);
  }

  close() {
    this._popupEl.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._escClose);
  }

  setEventListeners() {
    this._popupEl.querySelector('.popup__close-btn').addEventListener('click', this.close.bind(this));
    this._popupEl.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    })
  }
}