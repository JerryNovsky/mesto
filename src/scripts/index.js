import '../pages/index.css';

import { Card } from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import {
  formConfig,
  initialCards,
  popupEditButton,
  popupAddCardButton,
  formEditElement,
  formAddElement,
  nameInput,
  jobInput
} from './constants.js';
import { FormValidator } from './FormValidator.js';
import UserInfo from './UserInfo.js';

const userInfo = new UserInfo('.profile__name', '.profile__description');

const fullImagePopup = new PopupWithImage('.popup_type_cards', '.popup__cards-image', '.popup__cards-description');
fullImagePopup.setEventListeners();

const editFormValidation = new FormValidator(formConfig, formEditElement);
editFormValidation.enableValidation();

const addCardFormValidation = new FormValidator(formConfig, formAddElement);
addCardFormValidation.enableValidation();

//Редактирование информации о себе
const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', {
  submitCallback: (object) => {
    userInfo.setUserInfo(object);
  }
});

editProfilePopup.setEventListeners(formEditElement);

//Добавление пользовательской карточки
const addCardPopup = new PopupWithForm('.popup_type_add-card', {
  submitCallback: (object) => {
    cardList.addItem(addNewCard(object));
  }
});

addCardPopup.setEventListeners(formAddElement);


const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(addNewCard(item));
  }
}, '.elements__cards');

cardList.renderItems();

//Открытие полноразмерного изображения
function handleCardClick(data) {
  fullImagePopup.open(data);
}

//Добавление новой карточки в DOM
function addNewCard(element) {
  const newCard = new Card(element, '#item_template', () => handleCardClick(element), '.popup_type_cards');
  return newCard.generateCard();
};

//Сабмит добавления пользовательской карточки
function addPopupSubmitHandler(evt) {
  evt.preventDefault()

  addCardPopup.close();
};

//Открытие попапа редактирования профиля
function openPopupProfile() {
  const defaultUserData = userInfo.getUserInfo();
  nameInput.value = defaultUserData.name;
  jobInput.value = defaultUserData.job;
  editProfilePopup.open();
}

//Открытие попапа добавления карточки 
function openPopupAddCard() {
  addCardPopup.open();
  addCardFormValidation.disableSubmitButton();
}

popupEditButton.addEventListener('click', openPopupProfile);

popupAddCardButton.addEventListener('click', openPopupAddCard);