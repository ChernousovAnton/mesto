const showInputError = (formElement, inputElement, errorMessage, prop) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(prop.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(prop.errorClass);
};

const hideInputError = (formElement, inputElement, prop) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(prop.inputErrorClass);
  errorElement.classList.remove(prop.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, prop) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, prop);
  } else {
    hideInputError(formElement, inputElement, prop);
  }
};

const setEventListeners = (formElement, prop) => {
  console.log(formElement)
  const inputList = Array.from(formElement.querySelectorAll(prop.inputSelector));
  const buttonElement = formElement.querySelector(prop.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, prop)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, prop);
      toggleButtonState(inputList, buttonElement, prop);
    });
  });
};

const enableValidation = (prop) => {
  console.log(prop)
  const formList = Array.from(document.querySelectorAll(prop.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, prop);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, prop) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(prop.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(prop.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}
