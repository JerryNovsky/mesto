import '../pages/index.css';

import { Card } from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import {
  formConfig,
  initialCards,
  popupEditButton,
  popupEditProfile,
  popupAddCard,
  popupAddCardButton,
  formEditElement,
  formAddElement,
  fullCardsPopup,
  itemTemplate,
  nameInput,
  jobInput
} from './constants.js';
import { FormValidator } from './FormValidator.js';
import UserInfo from './UserInfo.js';

const userInfo = new UserInfo({ name: '.profile__name', job: '.profile__description' });
userInfo.getUserInfo();

const fullImagePopup = new PopupWithImage(fullCardsPopup);
fullImagePopup.setEventListeners();

const editFormValidation = new FormValidator(formConfig, formEditElement);
const addCardFormValidation = new FormValidator(formConfig, formAddElement);

const editProfilePopup = new PopupWithForm(popupEditProfile, handleSubmitProfileForm);
const addCardPopup = new PopupWithForm(popupAddCard, addPopupSubmitHandler);

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(item, itemTemplate, () => handleCardClick(item));
    const cardElement = newCard.generateCard();
    cardList.addItem(cardElement);
  }
}, '.elements__cards');

cardList.renderItems();

//Открытие полноразмерного изображения
function handleCardClick(data) {
  fullImagePopup.open(data);
}

//Добавление новой карточки в DOM
function addNewCard(element) {
  const newCard = new Card(element, itemTemplate, () => handleCardClick(element));
  const cardElement = newCard.generateCard();
  cardList.addItem(cardElement);
};

//Сабмит изменения данных о себе
function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  userInfo.setUserInfo();
  editProfilePopup.close();
};

//Сабмит добавления пользовательской карточки
function addPopupSubmitHandler(evt) {
  evt.preventDefault()
  addNewCard(addCardPopup._getInputValues());
  addCardPopup.close();
};

//Открытие попапа редактирования профиля
function openPopupProfile() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.description;
  editProfilePopup.open();
  editProfilePopup.setEventListeners(formEditElement);
  editFormValidation.enableValidation();
}

//Открытие попапа добавления карточки 
function openPopupAddCard() {
  addCardPopup.open();
  addCardPopup.setEventListeners(formAddElement);
  addCardFormValidation.enableValidation();
  addCardFormValidation.disableSubmitButton();
}

addCardFormValidation.enableValidation();

popupEditButton.addEventListener('click', openPopupProfile);

popupAddCardButton.addEventListener('click', openPopupAddCard);