import { itemTemplate, fullCardsImage, fullCardsDescription, fullCardsPopup, openPopup } from './index.js';

export class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  };

  /*Клонирование элемента и его возврат*/
  _getTemplate() {
    const newElement = itemTemplate.querySelector('.card').cloneNode(true);
    return newElement;
  };

  /*Проверка нажатия кнопки лайка*/
  _putLike(like) {
    like.classList.toggle('card__like-button_active');
  };

  /*Удаление карточки*/
  _deleteItem() {
    /*реализация через this._element = null не работает корректно*/
    this._element.remove();
    this._element = null;
  };

  /*Открытие полноразмерного изображение*/
  _openFullCardsPopup(link, name) {
    fullCardsImage.src = link.src;
    fullCardsDescription.textContent = name.textContent;
    fullCardsImage.alt = name.textContent;
    openPopup(fullCardsPopup);
  };

  /*Навешивание слушателей*/
  _setEventListeners() {
    const likeButton = this._element.querySelector('.card__like-button')

    likeButton.addEventListener('click', () => {
      this._putLike(likeButton);
    });

    this._cardImage.addEventListener('click', () => {
      this._openFullCardsPopup(this._cardImage, this._cardName);
    });

    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._deleteItem(this._element);
    });
  };

  /*Публичный метод создания карточки*/
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardName = this._element.querySelector('.card__name');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;
    this._setEventListeners();
    return this._element;
  };
};
