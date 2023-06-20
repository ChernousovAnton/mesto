const btnEditProfileEl = document.querySelector('.profile__edit-btn');
const btnAddCardEl = document.querySelector('.profile__add-btn');
const profileNameEl = document.querySelector('.profile__name');
const profileJobEl = document.querySelector('.profile__job');
const cardsEl = document.querySelector('.main .elements');
const popupEditProfileEl = document.querySelector('#edit-profile-popup');
const namePopupEditProfileEl = popupEditProfileEl.querySelector('input[name="name"]');
const jobPopupEditProfileEl = popupEditProfileEl.querySelector('input[name="job"]');
const popupAddCardEl = document.querySelector('#add-card-popup');
const popupCardEl = document.querySelector('#card-popup');
const popupCardFigcaptionEl = popupCardEl.querySelector('.popup__figcaption');
const popupCardImageEl = popupCardEl.querySelector('.popup__card-image');
const btnClosePopupEls = document.querySelectorAll('.popup__close-btn');
const formEditProfileEl = document.querySelector('form[name="edit-profile"]');
const formAddCardEl = document.querySelector('form[name="add-card"]');
const templateCard = document.querySelector('#card-template');
const popupsEl = document.querySelectorAll('.popup');
const keyPopupClose = 'Escape'

const closePopup = (popup) => popup.classList.remove('popup_opened');
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  popup.querySelectorAll('.form__input-error').forEach(error => error.textContent = '');
};

popupsEl.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
  })
})

document.addEventListener('keydown', function (evt) {
  if (evt.key === keyPopupClose) {
    popupsEl.forEach(popup => closePopup(popup));
  }
})

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});

function openEditProfilePopup() {
  openPopup(popupEditProfileEl);
  namePopupEditProfileEl.value = profileNameEl.textContent;
  jobPopupEditProfileEl.value = profileJobEl.textContent;
}

function openAddCardPopup() {
  openPopup(popupAddCardEl);
  formAddCardEl.reset();
}

function createCard(cardProperty) {
  const templateClone = templateCard.content.cloneNode(true);
  templateClone.querySelector('.card__title').textContent = cardProperty.name;
  const cardImage = templateClone.querySelector('.card__image');
  cardImage.src = cardProperty.link;
  cardImage.alt = cardProperty.name;
  templateClone.querySelector('.card__trash').addEventListener('click', e => e.target.closest('.card').remove());
  templateClone.querySelector('.card__like').addEventListener('click', e => e.target.classList.toggle('card__like_active'));
  cardImage.addEventListener('click', e => {
    popupCardFigcaptionEl.textContent = cardProperty.name;
    popupCardImageEl.src = cardProperty.link;
    popupCardImageEl.alt = cardProperty.name;
    openPopup(popupCardEl);
  });
  return templateClone;
}

initialCards.forEach(cardData => cardsEl.prepend(createCard(cardData)));

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
  const cardProperty = {name: name, link: link};
  const newCard = createCard(cardProperty);
  cardsEl.prepend(newCard);
  closePopup(popupAddCardEl);
  formAddCardEl.reset();
})

formEditProfileEl.addEventListener('submit', evt => {
  evt.preventDefault();
  profileNameEl.textContent = evt.target.querySelector('input[name="name"]').value;
  profileJobEl.textContent = evt.target.querySelector('input[name="job"]').value;
  closePopup(popupEditProfileEl);
})
