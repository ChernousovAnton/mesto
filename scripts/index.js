let popup = document.querySelector('.popup');
let editProfileBtn = document.querySelector('.profile__edit-btn');
let closePopupBtn = document.querySelector('.popup__close-btn');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__item_type_name');
let jobInput = formElement.querySelector('.form__item_type_job');

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopudHandler();
}

function editProfileHandler() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopudHandler() {
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);
editProfileBtn.addEventListener('click', editProfileHandler);
closePopupBtn.addEventListener('click', closePopudHandler);
