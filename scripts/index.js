const initialCards = [
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

const editProfileBtn = document.querySelector('.profile__edit-btn');
const addCardBtn = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardsEl = document.querySelector('.main .elements');
const editProfilePopup = document.querySelector('#edit-profile-popup');
const addCardPopup = document.querySelector('#add-card-popup');
const cardPopup = document.querySelector('#card-popup');
const closePopupBtns = document.querySelectorAll('.popup__close-btn');
const editProfileForm = document.querySelector('form[name="edit-profile"]');
const addCardForm = document.querySelector('form[name="add-card"]');

function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

function openEditProfilePopup() {
  editProfilePopup.classList.add('popup_opened');
  editProfilePopup.querySelector('input[name="name"]').value = profileName.textContent;
  editProfilePopup.querySelector('input[name="job"]').value = profileJob.textContent;
}

function openAddCardPopup() {
  addCardPopup.classList.add('popup_opened');
}

function createCard(cardProperty) {
  const template = document.querySelector('#card-template');
  const templateClone = template.content.cloneNode(true);
  templateClone.querySelector('.card__title').textContent = cardProperty.name;
  templateClone.querySelector('.card__image').src = cardProperty.link;
  templateClone.querySelector('.card__image').alt = cardProperty.name;
  templateClone.querySelector('.card__trash').addEventListener('click', e => e.target.closest('.card').remove());
  templateClone.querySelector('.card__like').addEventListener('click', e => e.target.classList.toggle('card__like_active'));
  templateClone.querySelector('.card__image').addEventListener('click', e => {
    cardPopup.querySelector('.popup__figcaption').textContent = cardProperty.name;
    cardPopup.querySelector('.popup__card-image').src = cardProperty.link;
    cardPopup.classList.add('popup_opened');
  });
  return templateClone
}

initialCards.forEach(e => cardsEl.prepend(createCard(e)));

editProfileBtn.addEventListener('click', openEditProfilePopup);
addCardBtn.addEventListener('click', openAddCardPopup);
closePopupBtns.forEach(closePopupBtn => closePopupBtn.addEventListener('click', evt => closePopup(evt)));

addCardForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const name = evt.target.querySelector('input[name="name"]').value;
  const link = evt.target.querySelector('input[name="link"]').value;
  const cardProperty = {name: name, link: link};
  const newCard = createCard(cardProperty);
  cardsEl.prepend(newCard);
  closePopup(evt);
})

editProfileForm.addEventListener('submit', evt => {
  evt.preventDefault();
  profileName.textContent = evt.target.querySelector('input[name="name"]').value;
  profileJob.textContent = evt.target.querySelector('input[name="job"]').value;
  closePopup(evt);
})
