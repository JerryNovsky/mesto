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

import { itemTemplate, fullCardsImage, fullCardsDescription, fullCardsPopup, openPopup } from './index.js';

export class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  };

  _getTemplate() {
    const newElement = itemTemplate.querySelector('.card').cloneNode(true);
    return newElement;
  };

  /*Проверка нажатия кнопки лайка*/
  _putLike(like) {
    like.classList.toggle('card__like-button_active');
  };

  /*Удаление карточки*/
  _deleteItem(item) {
    item.remove();
  };
  /*Открытие полноразмерного изображение*/
  _openFullCardsPopup(link, name) {
    fullCardsImage.src = link.src;
    fullCardsDescription.textContent = name.textContent;
    fullCardsImage.alt = name.textContent;
    openPopup(fullCardsPopup);
  };

  /*Навешивание слушателей*/
  _setEventListeners(image, name, element) {
    const likeButton = this._element.querySelector('.card__like-button')

    likeButton.addEventListener('click', () => {
      this._putLike(likeButton);
    });

    image.addEventListener('click', () => {
      this._openFullCardsPopup(image, name);
    });

    element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._deleteItem(element);
    });
  };

  /*Публичный метод создания карточки*/
  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.card__image');
    const cardName = this._element.querySelector('.card__name');

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardName.textContent = this._name;
    this._setEventListeners(cardImage, cardName, this._element)
    return this._element;
  };
};

initialCards.forEach((item) => {
  const card = new Card(item, '#item_template');
  const cardElement = card.generateCard();
  document.querySelector('.elements__cards').prepend(cardElement);
});