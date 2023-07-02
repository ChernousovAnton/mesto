import { initialCards } from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const btnEditProfileEl = document.querySelector('.profile__edit-btn');
const btnAddCardEl = document.querySelector('.profile__add-btn');
const profileNameEl = document.querySelector('.profile__name');
const profileJobEl = document.querySelector('.profile__job');
const cardsEl = document.querySelector('.main .elements');
const popupEditProfileEl = document.querySelector('#edit-profile-popup');
const namePopupEditProfileEl = popupEditProfileEl.querySelector('input[name="name"]');
const jobPopupEditProfileEl = popupEditProfileEl.querySelector('input[name="job"]');
const popupAddCardEl = document.querySelector('#add-card-popup');
const btnClosePopupEls = document.querySelectorAll('.popup__close-btn');

const popupCardEl = document.querySelector('#card-popup');
const popupCardFigcaptionEl = popupCardEl.querySelector('.popup__figcaption');
const popupCardImageEl = popupCardEl.querySelector('.popup__card-image');

const formEditProfileEl = document.querySelector('form[name="edit-profile"]');
const formAddCardEl = document.querySelector('form[name="add-card"]');
const templateCardSelector = '#card-template';
const popupsEl = document.querySelectorAll('.popup');

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

popupsEl.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
  })
})

function handleCardClick(name, link) {
  popupCardFigcaptionEl.textContent = name;
  popupCardImageEl.src = link;
  popupCardImageEl.alt = name;
  openPopup(popupCardEl);
}

const formProp = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const editProfileFormValidator = new FormValidator(formProp, formEditProfileEl);
const addCardFormValidator = new FormValidator(formProp, formAddCardEl);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

function openEditProfilePopup() {
  openPopup(popupEditProfileEl);
  namePopupEditProfileEl.value = profileNameEl.textContent;
  jobPopupEditProfileEl.value = profileJobEl.textContent;
  editProfileFormValidator.clearInputsError();
}

function openAddCardPopup() {
  openPopup(popupAddCardEl);
  formAddCardEl.reset();
  addCardFormValidator.clearInputsError();
}

function createCard(cardData) {
  const newCard = new Card(cardData, templateCardSelector, handleCardClick);
  const newCardEl = newCard.generateCard();
  return newCardEl;
}

initialCards.forEach(cardData => {
  const newCardEl = createCard(cardData);
  cardsEl.prepend(newCardEl);
});

btnEditProfileEl.addEventListener('click', openEditProfilePopup);
btnAddCardEl.addEventListener('click', openAddCardPopup);
btnClosePopupEls.forEach(closePopupBtn => closePopupBtn.addEventListener('click', evt => {
  const popupEl = evt.target.closest('.popup');
  closePopup(popupEl);
}));

formAddCardEl.addEventListener('submit', evt => {
  evt.preventDefault();
  const name = evt.target.querySelector('input[name="name"]').value;
  const link = evt.target.querySelector('input[name="link"]').value;
  const cardData = {name: name, link: link};
  const newCardEl = createCard(cardData);
  cardsEl.prepend(newCardEl);
  closePopup(popupAddCardEl);
  formAddCardEl.reset();
})

formEditProfileEl.addEventListener('submit', evt => {
  evt.preventDefault();
  profileNameEl.textContent = evt.target.querySelector('input[name="name"]').value;
  profileJobEl.textContent = evt.target.querySelector('input[name="job"]').value;
  closePopup(popupEditProfileEl);
})
