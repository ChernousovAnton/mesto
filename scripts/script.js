let popup = document.querySelector('.popup');
let editProfileBtn = document.querySelector('.profile__edit-btn');
let closePopupBtn = document.querySelector('.popup__close-btn');
let profileName = document.querySelector('.profile__title');
let profileText = document.querySelector('.profile__text');

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__item_type_name');
let jobInput = formElement.querySelector('.form__item_type_text');

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopupBtn.click();
}

function editProfileHandler() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
}

function closePopudHandler() {
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);
editProfileBtn.addEventListener('click', editProfileHandler);
closePopupBtn.addEventListener('click', closePopudHandler);
