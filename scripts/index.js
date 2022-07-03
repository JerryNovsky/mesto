const popupEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupEditCloseButton = document.querySelector('.popup__edit-close-button');
const popupAddCloseButton = document.querySelector('.popup__add-close-button');
const popupAddCardButton = document.querySelector('.profile__add-card-button');
const formEditElement = document.querySelector('.popup__content_type_edit-profile');
const list = document.querySelector('.elements__cards');
const itemTemplate = document.querySelector('#item_template').content;
const formAddElement = document.querySelector('.popup__content_type_add-card');
const popupFullCardButton = document.querySelector('.popup__cards-close-button');
const fullCardsImage = document.querySelector('.popup__cards-image');
const fullCardsDescription = document.querySelector('.popup__cards-description');
const fullCardsPopup = document.querySelector('.popup_cards');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_card-link');

/*Изменение данных о себе*/
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

/*Проверка нажатия кнопки лайка*/
function likeCheck(like) { 
  like.classList.toggle('elements__like-button_active');
};

/*Сброс значений из полей добавления карточки*/
function resetInput(link, name) {
  link.value = '';
  name.value = '';
}

/*Открытие полноразмерного изображения*/
function openFullCardsPopup (Link, name) {
  fullCardsImage.src = Link.src;
  fullCardsDescription.textContent = name.textContent;
  openPopup(fullCardsPopup);
};

/*Открытие попапа*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

/*Закрытие попапа*/
function closePopup (popup) {
  popup.classList.remove('popup_opened');
};

/*Закрытие попапа по клику на оверлей*/
function overlayClickClosePopup(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    };
  });
};

/*Рендер карточки*/
function renderCard (card) {
  list.prepend(card); 
};

/*Добавление карточки на страницу*/
function addCard(element) {
  const newCard = createCard(element);
  renderCard(newCard);
};

/*Создание карточки*/
function createCard(el) {
  const newElement = itemTemplate.querySelector('.elements__card').cloneNode(true);
  const likeButton = newElement.querySelector('.elements__like-button');
  const cardImage = newElement.querySelector('.elements__image');
  const cardName = newElement.querySelector('.elements__name');
    
  cardImage.src = el.link;
  cardImage.alt = el.name;
  cardName.textContent = el.name;

  likeButton.addEventListener('click', () => {
    likeCheck(likeButton);
  });

  
  newElement.querySelector('.elements__image').addEventListener('click', function() {
    openFullCardsPopup(cardImage, cardName);
  });  

  newElement.querySelector('.elements__delete-button').addEventListener('click', () => {
    deleteItem(newElement);
  });

  return newElement;
};

/*Сабмит добавление пользовательской карточки*/
function addPopupSubmitHandler(evt) {
  evt.preventDefault()
  addCard({name: cardNameInput.value, link: cardLinkInput.value});
  closePopup(popupAddCard);
  resetInput(cardLinkInput, cardNameInput);
};

/*Удаление карточки*/
function deleteItem(item) {
  item.remove();
}

popupEditButton.addEventListener('click', function() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

popupEditCloseButton.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

formEditElement.addEventListener('submit', formSubmitHandler);

document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    closePopup(popupAddCard);
    closePopup(popupEditProfile);
    closePopup(fullCardsPopup);
  };
});

popupAddCardButton.addEventListener('click', function() {
  openPopup(popupAddCard);
});

popupAddCloseButton.addEventListener('click', function() {
  closePopup(popupAddCard);
});

popupFullCardButton.addEventListener('click', function() {
  closePopup(fullCardsPopup);
});

overlayClickClosePopup(popupEditProfile);
overlayClickClosePopup(popupAddCard);
overlayClickClosePopup(fullCardsPopup);

initialCards.forEach(addCard);

formAddElement.addEventListener('submit', addPopupSubmitHandler);