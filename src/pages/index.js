import './index.css';

import { initialCards, selectors, formProp } from "../scripts/utils/constants.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js"
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";

const btnEditProfileEl = document.querySelector(selectors.btnEditProfile);
const btnAddCardEl = document.querySelector(selectors.btnAddCard);

const namePopupEditProfileEl = document.querySelector(`${selectors.editProfilePopup} ${selectors.inputName}`);
const jobPopupEditProfileEl = document.querySelector(`${selectors.editProfilePopup} ${selectors.inputJob}`);

const formEditProfileEl = document.querySelector(selectors.formEditProfile);
const formAddCardEl = document.querySelector(selectors.formAddCard);

const popupCard = new PopupWithImage(selectors.popupCard);
popupCard.setEventListeners();
const popupAddCard = new PopupWithForm(selectors.popupAddCard, submitCardFormHandler);
popupAddCard.setEventListeners();
const popupEditProfile = new PopupWithForm(selectors.editProfilePopup, submitEditProfileFormHandler);
popupEditProfile.setEventListeners();
const userInfo = new UserInfo({nameSelector: selectors.profileName, jobSelector: selectors.profileJob});

const editProfileFormValidator = new FormValidator(formProp, formEditProfileEl);
const addCardFormValidator = new FormValidator(formProp, formAddCardEl);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

btnEditProfileEl.addEventListener('click', openEditProfilePopup);
btnAddCardEl.addEventListener('click', openAddCardPopup);

function handleCardClick(name, link) {
  popupCard.open(name, link);
}

function openEditProfilePopup() {
  popupEditProfile.open();
  namePopupEditProfileEl.value = userInfo.getUserInfo().name;
  jobPopupEditProfileEl.value = userInfo.getUserInfo().job;
  editProfileFormValidator.validateOpenedForm();
}

function openAddCardPopup() {
  popupAddCard.open();
  addCardFormValidator.validateOpenedForm();
}

function renderer(item) {
  const card = new Card(item, selectors.templateCard, handleCardClick);
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

function submitCardFormHandler(evt) {
  evt.preventDefault();
  const name = evt.target.querySelector(selectors.inputName).value;
  const link = evt.target.querySelector(selectors.inputLink).value;
  const cardData = [{name: name, link: link}];
  const cardsList = new Section({items: cardData, renderer: renderer}, selectors.cardContainer);
  cardsList.renderItems();
  formAddCardEl.reset();
}

function submitEditProfileFormHandler(evt) {
  evt.preventDefault();
  const name = evt.target.querySelector(selectors.inputName).value;
  const job = evt.target.querySelector(selectors.inputJob).value;
  userInfo.setUserInfo(name, job);
  popupEditProfile.close();
}

const cardsList = new Section({items: initialCards, renderer: renderer}, selectors.cardContainer);
cardsList.renderItems();
