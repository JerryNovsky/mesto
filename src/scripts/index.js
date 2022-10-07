import '../pages/index.css';

import { Card } from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithSubmit from './PopupWithSubmit.js';
import {
  formConfig,
  popupEditButton,
  popupAddCardButton,
  formEditElement,
  formAddElement,
  formEditAvatar,
  editAvatarButton,
  nameInput,
  jobInput
} from './constants.js';
import { FormValidator } from './FormValidator.js';
import UserInfo from './UserInfo.js';
import { Api } from './Api.js';

const config = {
  url: 'https://nomoreparties.co/v1/cohort-51',
  authorization: 'e466dc8d-1112-4a77-afc1-eb46a36ee862',
  contentType: 'application/json'
}

const api = new Api(config);

const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');

const fullImagePopup = new PopupWithImage('.popup_type_cards', '.popup__cards-image', '.popup__cards-description');
fullImagePopup.setEventListeners();

const editFormValidation = new FormValidator(formConfig, formEditElement);
editFormValidation.enableValidation();

const addCardFormValidation = new FormValidator(formConfig, formAddElement);
addCardFormValidation.enableValidation();

const editAvatarFormValidation = new FormValidator(formConfig, formEditAvatar);
editAvatarFormValidation.enableValidation();

let userId;

//Редактирование информации о себе
const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', {
  submitCallback: (input) => {
    editProfilePopup.handleSaving();
    api.setUserData(input)
      .then(res => {
        userInfo.setUserInfo({ name: res.name, about: res.about })
      })
      .then(() => editProfilePopup.close())
      .catch(err => console.log(`${err}`))
      .finally(() => editProfilePopup.handleSaved())
  }
});

editProfilePopup.setEventListeners(formEditElement);

//Попап изменения аватара
const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', {
  submitCallback: (input) => {
    popupEditAvatar.handleSaving();
    api.changeUserAvatar(input['avatar-link'])
      .then(res => {
        userInfo.setAvatar(res);
      })
      .then(() => popupEditAvatar.close())
      .catch(err => console.log(`${err}`))
      .finally(() => popupEditAvatar.handleSaved())
  }
});

popupEditAvatar.setEventListeners(formEditAvatar);

//Добавление пользовательской карточки
const addCardPopup = new PopupWithForm('.popup_type_add-card', {
  submitCallback: (input) => {
    api.addNewCard(input)
      .then(input => {
        cardList.addItem(addNewCard(input))
      })
      .then(() => addCardPopup.close())
      .catch(err => console.log(`${err}`))
  }
});

addCardPopup.setEventListeners(formAddElement);
const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(addNewCard(item));
  }
}, '.elements__cards');

Promise.all([api.getUserData(), api.getAllCards()])
  .then(([data, cards]) => {
    userInfo.setUserInfo({ name: data.name, about: data.about })
    userInfo.setAvatar(data);
    userId = data._id;
    cardList.renderItems(cards);
  })
  .catch(err => {
    console.log(`Ошибка, ${err}`);
  })

//Запрос подтверждения удаления собственной карточки
const submitPopup = new PopupWithSubmit('.popup_delete-card-confirmation', {
  submitCallback: (userId, element) => {
    api.deleteCard(userId)
      .then(() => element.remove())
      .then(() => submitPopup.close())
      .catch(err =>
        console.log(`${err}`)
      )
  }
});

submitPopup.setEventListeners();

//Добавление новой карточки в DOM
function addNewCard(element) {
  const newCard = new Card(element, userId, '#item_template', {
    handleCardClick: (name, link) => {
      fullImagePopup.open(name, link);
    },
    handleDeleteCard: (cardId, element) => {
      submitPopup.open(cardId, element);
    },
    handlePutLike: (data, callback) => {
      api.putLike(data._id)
        .then((card) =>
          callback(card.likes))
    },
    handleRemoveLike: (data, callback) => {
      api.removeLike(data._id)
        .then((card) =>
          callback(card.likes))
    }
  });
  return newCard.generateCard();
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

function openEditAvatarPopup() {
  popupEditAvatar.open();

}

popupEditButton.addEventListener('click', openPopupProfile);

popupAddCardButton.addEventListener('click', openPopupAddCard);

editAvatarButton.addEventListener('click', openEditAvatarPopup);