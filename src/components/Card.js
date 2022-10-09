export class Card {
  constructor(data, userID, selector, handlers) {
    this._name = data.name;
    this._link = data.link;
    this._cardID = data._id;
    this._data = data;
    this._likes = data.likes.length;
    this._selector = document.querySelector(selector).content;
    this._userID = userID;
    this._handleCardClick = handlers.handleCardClick;
    this._handleDeleteCard = handlers.handleDeleteCard;
    this._myCard = data.owner._id === this._userID;
    this._putLikeHandler = handlers.handlePutLike;
    this._removeLikeHandler = handlers.handleRemoveLike;
  };

  getCardId() {
    return this._data._id;
  };

  /*Клонирование элемента и его возврат*/
  _getTemplate() {
    const newElement = this._selector.querySelector('.card').cloneNode(true);
    return newElement;
  };

  _checkLike() {
    return this._data.likes.some((item) => item._id === this._userID);
  }

  _updateLikeInfo(likes) {
    this._data.likes = likes;
    this._likeQuantity.textContent = this._data.likes.length;
  }

  _handlePutLike() {
    this._putLikeHandler(this._data, (likes) => {
      this._updateLikeInfo(likes);
      this._likeButton.classList.add('card__like-button_active');
    });
  }

  _handleRemoveLike() {
    this._removeLikeHandler(this._data, (likes) => {
      this._updateLikeInfo(likes);
      this._likeButton.classList.remove('card__like-button_active');
    })
  }

  /*Удаление карточки*/
  deleteCard() {
    this._element.remove();
    this._element = null;

  };

  /*Навешивание слушателей*/
  _setEventListeners() {

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener('click', () => {

      if (this._checkLike()) {
        this._handleRemoveLike();
      } else {
        this._handlePutLike();
      }
    })

    if (this._myCard)
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteCard(this);
      })
  }

  /*Публичный метод создания карточки*/
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardName = this._element.querySelector('.card__name');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;
    this._likeQuantity = this._element.querySelector('.card__like-quantity');
    this._likeQuantity.textContent = this._likes;

    if (this._checkLike()) {
      this._likeButton.classList.add('card__like-button_active');
    }
    if (!this._myCard) {
      this._deleteButton.classList.add('card__delete-button_inactive')
    }

    this._setEventListeners();
    return this._element;
  };

};
