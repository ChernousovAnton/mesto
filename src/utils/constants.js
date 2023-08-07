export const selectors = {
  cardContainer: '.main .elements',

  btnEditProfile: '.profile__edit-btn',
  btnAddCard: '.profile__add-btn',
  formEditProfile: 'form[name="edit-profile-form"]',
  formAddCard: 'form[name="add-card-form"]',
  formConfirmation: 'form[name="confirmation-form"]',
  formEditAvatar: 'form[name="edit-avatar-form"]',
  formSubmitBtn: '.form__submit',
  templateCard: '#card-template',
  popupEditProfile: '#edit-profile-popup',
  popupCard: '#card-popup',
  popupAddCard: '#add-card-popup',
  popupConfirmation: '#confirmation-popup',
  popupEditAvatar: '#edit-avatar-popup',
  inputName: 'input[name="name"]',
  inputLink: 'input[name="link"]',
  inputAbout: 'input[name="about"]',
  profileName: '.profile__name',
  profileAbout: '.profile__about',
  profileAvatar: '.profile__avatar',
  profileImage: '.profile__image'
};

export const formProp = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

export const textSaving = 'Сохранени...';

export const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: 'a7df98f9-87e5-4907-acfc-113e20edd625',
    'Content-Type': 'application/json'
  },
  methodsBodyRequired: ['POST', 'PATCH', 'PUT']
};
