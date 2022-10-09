import '../pages/index.css';

import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import {
  formConfig,
  popupEditButton,
  popupAddCardButton,
  formEditElement,
  formAddElement,
  formEditAvatar,
  avatarEditButton,
  nameInput,
  jobInput
} from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const config = {
  url: 'https://nomoreparties.co/v1/cohort-51',
  authorization: 'e466dc8d-1112-4a77-afc1-eb46a36ee862',
  contentType: 'application/json'
}

const api = new Api(config);

const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');

const fullImagePopup = new PopupWithImage('.popup_type_cards', '.popup__cards-image', '.popup__cards-description');
fullImagePopup.setEventListeners();

const FormEditValidator = new FormValidator(formConfig, formEditElement);
FormEditValidator.enableValidation();

const FormAddCardValidator = new FormValidator(formConfig, formAddElement);
FormAddCardValidator.enableValidation();

const FormEditAvatarValidator = new FormValidator(formConfig, formEditAvatar);
FormEditAvatarValidator.enableValidation();

let userId;

//Редактирование информации о себе
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', {
  submitCallback: (input) => {
    popupEditProfile.handleSaving();
    api.setUserData(input)
      .then(res => {
        userInfo.setUserInfo({ name: res.name, about: res.about })
        popupEditProfile.close();
      })
      .catch(err => console.log(`${err}`))
      .finally(() => popupEditProfile.handleSaved('Сохранить'))
  }
});

popupEditProfile.setEventListeners(formEditElement);

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
      .finally(() => popupEditAvatar.handleSaved('Сохранить'))
  }
});

popupEditAvatar.setEventListeners(formEditAvatar);

//Добавление пользовательской карточки
const popupAddCard = new PopupWithForm('.popup_type_add-card', {
  submitCallback: (input) => {
    popupAddCard.handleSaving();
    api.addNewCard(input)
      .then(input => {
        cardList.addItem(addNewCard(input))
      })
      .then(() => popupAddCard.close())
      .catch(err => console.log(`${err}`))
      .finally(() => popupAddCard.handleSaved('Создать'));
  }
});

popupAddCard.setEventListeners(formAddElement);
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
const popupWithSubmit = new PopupWithSubmit('.popup_delete-card-confirmation', {
  submitCallback: (card) => {
    api.deleteCard(card.getCardId())
      .then(() => card.deleteCard())
      .then(() => popupWithSubmit.close())
      .catch(err =>
        console.log(`${err}`)
      )
  }
});

popupWithSubmit.setEventListeners();

//Добавление новой карточки в DOM
function addNewCard(element) {
  const newCard = new Card(element, userId, '#item_template', {
    handleCardClick: (name, link) => {
      fullImagePopup.open(name, link);
    },
    handleDeleteCard: (card) => {
      popupWithSubmit.open(card);
      /*api.deleteCard(card.getCardId())
        .then(() => {
          card.deleteCard();
          popupWithSubmit.close();
        })
        .catch(err =>
          console.log(`${err}`)
        )*/
    },
    handlePutLike: (data, callback) => {
      api.putLike(data._id)
        .then((card) =>
          callback(card.likes))
        .catch(err =>
          console.log(`${err}`)
        )

    },
    handleRemoveLike: (data, callback) => {
      api.removeLike(data._id)
        .then((card) =>
          callback(card.likes))
        .catch(err =>
          console.log(`${err}`)
        )
    }
  });
  return newCard.generateCard();
};

//Открытие попапа редактирования профиля
function openPopupProfile() {
  const defaultUserData = userInfo.getUserInfo();
  nameInput.value = defaultUserData.name;
  jobInput.value = defaultUserData.about;
  popupEditProfile.open();
}

//Открытие попапа добавления карточки 
function openPopupAddCard() {
  popupAddCard.open();
  FormAddCardValidator.disableSubmitButton();
}

function openEditAvatarPopup() {
  popupEditAvatar.open();

}

popupEditButton.addEventListener('click', openPopupProfile);

popupAddCardButton.addEventListener('click', openPopupAddCard);

avatarEditButton.addEventListener('click', openEditAvatarPopup);