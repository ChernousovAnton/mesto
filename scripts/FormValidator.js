export default class FormValidator {
  constructor(prop, formEl) {
    this._formEl = formEl;
    this._inputList = Array.from(this._formEl.querySelectorAll(prop.inputSelector));
    this._buttonElement = this._formEl.querySelector(prop.submitButtonSelector);
    this._inactiveButtonClass = prop.inactiveButtonClass;
    this._inputErrorClass = prop.inputErrorClass;
    this._errorClass = prop.errorClass
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formEl.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formEl.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }
}
