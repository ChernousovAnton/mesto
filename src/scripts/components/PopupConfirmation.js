import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = submitHandler;
    this._formEl = this._popupEl.querySelector('form');
  }

  open(_id, element) {
    this._id = _id;
    this._element = element;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formEl.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitHandler(this._id, this._element);
      this.close();
    })
  }
}