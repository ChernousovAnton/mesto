import './index.css';

import { selectors, formProp, myId, textSaving, apiOptions } from "../scripts/utils/constants.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js"
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupConfirmation from "../scripts/components/PopupConfirmation.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js"

const btnEditProfileEl = document.querySelector(selectors.btnEditProfile);
const btnAddCardEl = document.querySelector(selectors.btnAddCard);
const profileAvatarEl = document.querySelector(selectors.profileAvatar);
const profileAvatarImageEl = document.querySelector(selectors.profileImage);

const namePopupEditProfileEl = document.querySelector(`${selectors.popupEditProfile} ${selectors.inputName}`);
const aboutPopupEditProfileEl = document.querySelector(`${selectors.popupEditProfile} ${selectors.inputAbout}`);
const linkPopupEditAvatarEl = document.querySelector(`${selectors.popupEditAvatar} ${selectors.inputLink}`);

const formEditProfileEl = document.querySelector(selectors.formEditProfile);
const formEditProfileSubmitBtnEl = formEditProfileEl.querySelector(selectors.formSubmitBtn);
const formAddCardEl = document.querySelector(selectors.formAddCard);
const formAddCardSubmitBtnEl = formAddCardEl.querySelector(selectors.formSubmitBtn);
const formEditAvatarEl = document.querySelector(selectors.formEditAvatar);
const formEditAvatarSubmitBtnEl = formEditAvatarEl.querySelector(selectors.formSubmitBtn);

const popupCard = new PopupWithImage(selectors.popupCard);
popupCard.setEventListeners();
const popupAddCard = new PopupWithForm(selectors.popupAddCard, renderCard);
popupAddCard.setEventListeners();
const popupEditProfile = new PopupWithForm(selectors.popupEditProfile, submitEditProfileFormHandler);
popupEditProfile.setEventListeners();
const popupConfirmation = new PopupConfirmation(selectors.popupConfirmation, submitConfirmationHandler);
popupConfirmation.setEventListeners();
const popupEditAvatar = new PopupWithForm(selectors.popupEditAvatar, submitEditAvatarFormHandler);
popupEditAvatar.setEventListeners();

const editProfileFormValidator = new FormValidator(formProp, formEditProfileEl);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(formProp, formAddCardEl);
addCardFormValidator.enableValidation();
const editAvatarFormValidator = new FormValidator(formProp, formEditAvatarEl);
editAvatarFormValidator.enableValidation();

btnEditProfileEl.addEventListener('click', openEditProfilePopup);
btnAddCardEl.addEventListener('click', openAddCardPopup);
profileAvatarEl.addEventListener('click', handleAvatarClick);

function handleAvatarClick() {
  linkPopupEditAvatarEl.value = '';
  popupEditAvatar.open();
  editAvatarFormValidator.validateOpenedForm();
}

function handleCardClick(name, link) {
  popupCard.open(name, link);
}

function handleTrashClick(cardId, cardElement) {
  popupConfirmation.open(cardId, cardElement);
}

function sendLikeRequest(cardId, action) {
  return api.sendLikeRequest(cardId, action);
}

function openEditProfilePopup() {
  popupEditProfile.open();
  namePopupEditProfileEl.value = userInfo.getUserInfo().name;
  aboutPopupEditProfileEl.value = userInfo.getUserInfo().about;
  editProfileFormValidator.validateOpenedForm();
}

function openAddCardPopup() {
  popupAddCard.open();
  addCardFormValidator.validateOpenedForm();
}

function renderCard(item) {
  const initialSubmitBtnText = formAddCardSubmitBtnEl.textContent;
  formAddCardSubmitBtnEl.textContent = textSaving;
  api.createCard(item)
    .then((json) => {
      const card = new Card(json, selectors.templateCard, handleCardClick, handleTrashClick, sendLikeRequest, myId);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement)
    })
    .catch(err => console.error(err))
    .finally(() => formAddCardSubmitBtnEl.textContent = initialSubmitBtnText);
}

function submitEditProfileFormHandler(data) {
  const initialSubmitBtnText = formEditProfileSubmitBtnEl.textContent;
  formEditProfileSubmitBtnEl.textContent = textSaving;
  api.editUserInfo(data)
    .then(json => {userInfo.setUserInfo(json)})
    .catch(err => console.error(err))
    .finally(() => formEditProfileSubmitBtnEl.textContent = initialSubmitBtnText);
}

function submitEditAvatarFormHandler(data) {
  const initialSubmitBtnText = formEditAvatarSubmitBtnEl.textContent;
  formEditAvatarSubmitBtnEl.textContent = textSaving;
  api.editAvatar(data.link)
    .then((json) => profileAvatarImageEl.src = json.avatar)
    .catch(err => console.error(err))
    .finally(() => formEditAvatarSubmitBtnEl.textContent = initialSubmitBtnText);
}

function submitConfirmationHandler(cardId, element) {
  api.deleteCard(cardId)
    .then(() => {
      element.remove();
      element = null;
    })
    .catch(err => console.error(err));
}

const api = new Api(apiOptions);

const initialCards = await api.getInitialCards();
const cardsList = new Section({items: initialCards, renderer: renderCard}, selectors.cardContainer);
cardsList.renderItems();

const userInfo = new UserInfo({
  nameSelector: selectors.profileName,
  aboutSelector: selectors.profileAbout,
  avatarSelector: selectors.profileImage
});

api.getUserInfo()
  .then(json => userInfo.setUserInfo(json))
  .catch(err => console.error(err));
