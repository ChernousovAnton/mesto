import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = submitHandler;
    this._formEl = this._popupEl.querySelector('form');
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formEl.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitHandler(this._card);
      this.close();
    })
  }
}