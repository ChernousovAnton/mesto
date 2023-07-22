import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(selector, submitFormHandler) {
    super(selector);
    this._submitFormHandler = submitFormHandler;
    this._formEl = this._popupEl.querySelector('form');
  }

  _getInputValues() {
    this._inputList = this._popupEl.querySelectorAll('.form__input');
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formEl.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitFormHandler(this._getInputValues());
      this._formEl.reset();
      this.close();
    })
  }
}