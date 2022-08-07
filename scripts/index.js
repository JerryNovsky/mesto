import { Card } from './Card.js';
import { formConfig, initialCards } from './constants.js';
import { FormValidator } from './FormValidator.js';

const popupEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupEditCloseButton = document.querySelector('.popup__edit-close-button');
const popupAddCloseButton = document.querySelector('.popup__add-close-button');
const popupAddCardButton = document.querySelector('.profile__add-card-button');
const formEditElement = document.querySelector('.popup__content_type_edit-profile');
const formAddElement = document.querySelector('.popup__content_type_add-card');
const popupFullCardButton = document.querySelector('.popup__cards-close-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_card-link');
const list = document.querySelector('.elements__cards');
export const itemTemplate = document.querySelector('#item_template').content;
export const fullCardsImage = document.querySelector('.popup__cards-image');
export const fullCardsDescription = document.querySelector('.popup__cards-description');
export const fullCardsPopup = document.querySelector('.popup_type_cards');



/*Изменение данных о себе*/
function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

/*Сброс значений из полей добавления карточки*/
function resetInput(link, name) {
  link.value = '';
  name.value = '';
};

/*открытие попапа*/
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
};

/*Закрытие попапа*/
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
};

/*Закрытие попапа по клику на оверлей*/
function overlayClickClosePopup(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    };
  });
};

/*Закрытие попапа по нажатию Escape*/
export function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

/*Рендер карточки*/
function renderCard(card) {
  list.prepend(card);
};

/*Добавление новой карточки в DOM*/
function addCard(element) {
  const newCard = new Card(element);
  const cardElement = newCard.generateCard();
  renderCard(cardElement);
};

/*Сабмит добавления пользовательской карточки*/
function addPopupSubmitHandler(evt) {
  evt.preventDefault()
  addCard({ name: cardNameInput.value, link: cardLinkInput.value });
  closePopup(popupAddCard);
  resetInput(cardLinkInput, cardNameInput);
};

initialCards.forEach((item) => {
  addCard(item);
});

const editFormValidation = new FormValidator(formConfig, formEditElement);
const addCardFormValidation = new FormValidator(formConfig, formAddElement);

editFormValidation.enableValidation();
addCardFormValidation.enableValidation();

popupEditButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
});

popupEditCloseButton.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

popupAddCloseButton.addEventListener('click', function () {
  closePopup(popupAddCard);
});

formEditElement.addEventListener('submit', handleSubmitProfileForm);

popupAddCardButton.addEventListener('click', function () {
  const submitButton = formAddElement.querySelector('.popup__save-button');
  editFormValidation.disableSubmitButton(submitButton);
  addCardFormValidation.disableSubmitButton(submitButton);
  openPopup(popupAddCard);
});

popupFullCardButton.addEventListener('click', function () {
  closePopup(fullCardsPopup);
});

overlayClickClosePopup(popupEditProfile);
overlayClickClosePopup(popupAddCard);
overlayClickClosePopup(fullCardsPopup);

formAddElement.addEventListener('submit', addPopupSubmitHandler);