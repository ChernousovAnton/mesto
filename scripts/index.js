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
  }
];

const popups = [
  {
    elementId: 'profile-popup',
    title: 'Редактировать профиль',
    inputs: [
      {
        name: 'name',
        placeholder: 'Имя',
      },
      {
        name: 'job',
        placeholder: 'Профессия',
      },
    ],
    bntTextContent: 'Сохранить',
    handleFormSubmit: profileFormSubmit,
  },
  {
    elementId: 'card-popup',
    title: 'Новое место',
    inputs: [
      {
        name: 'name',
        placeholder: 'Название',
      },
      {
        name: 'link',
        placeholder: 'Ссылка на картинку',
      },
    ],
    bntTextContent: 'Создать',
    handleFormSubmit: cardFormSubmit,
  },
]

const profilePopup = document.querySelector('#profile-popup');
const cardPopup = document.querySelector('#card-popup');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const addProfileBtn = document.querySelector('.profile__add-btn');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardsEl = document.querySelector('.main .elements');

function createPopup(popupProperty) {
  const template = document.querySelector('#popup-template');
  const templateClone = template.content.cloneNode(true);
  templateClone.querySelector('.popup').id =popupProperty.elementId;
  templateClone.querySelector('.popup__title').textContent = popupProperty.title;
  templateClone.querySelectorAll('input').forEach((input, index) => {
    input.name = popupProperty.inputs[index].name;
    input.placeholder = popupProperty.inputs[index].placeholder;
  })
  templateClone.querySelector('.form__submit').textContent = popupProperty.bntTextContent;
  const closePopupBtn = templateClone.querySelector('.popup__close-btn');
  closePopupBtn.addEventListener('click', e => closePopup(evt));
  templateClone.querySelector('.form').addEventListener('submit', ent => popupProperty.handleFormSubmit(evt));
  return templateClone
}

function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

function profileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = evt.target.querySelector('input[name="name"]').value;
  profileJob.textContent = evt.target.querySelector('input[name="job"]').value;
  closePopup(evt);
}

function cardFormSubmit(evt) {
  evt.preventDefault();
  const name = evt.target.querySelector('input[name="name"]').value;
  const link = evt.target.querySelector('input[name="link"]').value;
  const cardProperty = {name: name, link: link};
  const newCard = createCard(cardProperty);
  cardsEl.prepend(newCard);
  closePopup(evt);
}

function openProfilePopup() {
  profilePopup.classList.add('popup_opened');
  profilePopup.querySelector('input[name="name"]').value = profileName.textContent;
  profilePopup.querySelector('input[name="job"]').value = profileJob.textContent;
}

function openCardPopup() {
  cardPopup.classList.add('popup_opened');
}

function createCard(cardProperty) {
  const template = document.querySelector('#card-template');
  const templateClone = template.content.cloneNode(true);
  templateClone.querySelector('.card__title').textContent = cardProperty.name;
  templateClone.querySelector('.card__image').src = cardProperty.link;
  templateClone.querySelector('.card__trash').addEventListener('click', e => e.target.closest('.card').remove());
  templateClone.querySelector('.card__like').addEventListener('click', e => e.target.classList.toggle('card__like_active'));
  return templateClone
}

initialCards.forEach(e => cardsEl.prepend(createCard(e)));
popups.forEach(e => {document.querySelector('.page').append(createPopup(e))});

editProfileBtn.addEventListener('click', openProfilePopup);
addProfileBtn.addEventListener('click', openCardPopup);
