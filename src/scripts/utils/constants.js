export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

export const selectors = {
  cardContainer: '.main .elements',
  editProfilePopup: '#edit-profile-popup',
  btnEditProfile: '.profile__edit-btn',
  btnAddCard: '.profile__add-btn',
  formEditProfile: 'form[name="edit-profile"]',
  formAddCard: 'form[name="add-card"]',
  templateCard: '#card-template',
  popupCard: '#card-popup',
  popupAddCard: '#add-card-popup',
  inputName: 'input[name="name"]',
  inputLink: 'input[name="link"]',
  inputJob: 'input[name="job"]',
  profileName: '.profile__name',
  profileJob: '.profile__job',
}

export const formProp = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};