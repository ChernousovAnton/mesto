import './index.css';

import { selectors, formProp, textSaving, apiOptions } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirmation from "../components/PopupConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js"

let myId;

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
const popupAddCard = new PopupWithForm(selectors.popupAddCard, submitAddCardFormHandler);
popupAddCard.setEventListeners();
const popupEditProfile = new PopupWithForm(selectors.popupEditProfile, submitEditProfileFormHandler);
popupEditProfile.setEventListeners();
const popupConfirmation = new PopupConfirmation(selectors.popupConfirmation, submitConfirmationHandler);
popupConfirmation.setEventListeners();
const popupEditAvatar = new PopupWithForm(selectors.popupEditAvatar, submitEditAvatarFormHandler);
popupEditAvatar.setEventListeners();

const profileEditFormValidator = new FormValidator(formProp, formEditProfileEl);
profileEditFormValidator.enableValidation();
const cardAddFormValidator = new FormValidator(formProp, formAddCardEl);
cardAddFormValidator.enableValidation();
const avatarEditFormValidator = new FormValidator(formProp, formEditAvatarEl);
avatarEditFormValidator.enableValidation();

btnEditProfileEl.addEventListener('click', openEditProfilePopup);
btnAddCardEl.addEventListener('click', openAddCardPopup);
profileAvatarEl.addEventListener('click', handleAvatarClick);

function handleAvatarClick() {
  linkPopupEditAvatarEl.value = '';
  popupEditAvatar.open();
  avatarEditFormValidator.validateOpenedForm();
}

function handleCardClick(name, link) {
  popupCard.open(name, link);
}

function handleTrashClick(removeCardElement) {
  popupConfirmation.open(removeCardElement);
}

function handleLikeClick(isLiked, cardId, toggleCardLike) {
  const method = isLiked ? 'DELETE' : 'PUT';
  api.sendLikeRequest(cardId, method)
    .then(json => toggleCardLike(json.likes))
    .catch(err => console.error(err));
}

function openEditProfilePopup() {
  popupEditProfile.open();
  const {name, about} = userInfo.getUserInfo();
  namePopupEditProfileEl.value = name;
  aboutPopupEditProfileEl.value = about;
  profileEditFormValidator.validateOpenedForm();
}

function openAddCardPopup() {
  popupAddCard.open();
  cardAddFormValidator.validateOpenedForm();
}

function renderCards(cardData) {
  cardsList.addItems(createCardElement(cardData));
}

function createCardElement(cardData) {
  const card = new Card(cardData, selectors.templateCard, handleCardClick, handleTrashClick, handleLikeClick, myId);
  const cardElement = card.generateCard();
  return cardElement;
}

function submitAddCardFormHandler(item) {
  const initialSubmitBtnText = formAddCardSubmitBtnEl.textContent;
  formAddCardSubmitBtnEl.textContent = textSaving;
  api.createCard(item)
    .then((cardData) => cardsList.addItem(createCardElement(cardData)))
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

function submitConfirmationHandler(card) {
  api.deleteCard(card.getCardId())
    .then(() => card.removeCardElement())
    .catch(err => console.error(err));
}

const api = new Api(apiOptions);

const userInfo = new UserInfo({
  nameSelector: selectors.profileName,
  aboutSelector: selectors.profileAbout,
  avatarSelector: selectors.profileImage
});

const cardsList = new Section({renderer: renderCards}, selectors.cardContainer);

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
.then(([userData, initialCards]) => {
  userInfo.setUserInfo(userData);
  myId = userData._id;
  cardsList.renderItems(initialCards);
})
.catch(err => {console.error(err)})
