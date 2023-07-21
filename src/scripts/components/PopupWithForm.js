import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(selector, submitFormHandler) {
    super(selector);
    this._submitFormHandler = submitFormHandler;
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
    this._popupEl.querySelector('form').addEventListener('submit', this._submitFormHandler);
  }

  close() {
    super.close();
    this._popupEl.querySelector('form').reset();
  }
}