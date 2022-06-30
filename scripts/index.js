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

function closePopup (popup) {
  popup.classList.remove('popup_opened');
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

function deleteItem(item) {
  item.remove();
}

function likeCheck(like) { 
  like.classList.toggle('elements__like-button_active');
};

function resetInput(link, name) {
  link.value = '';
  name.value = '';
}

function openFullCardsPopup (Link, name) {
  fullCardsImage.src = Link.src;
  fullCardsDescription.textContent = name.textContent;
  openPopup(fullCardsPopup);
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function renderCard (card) {
  list.prepend(card); 
};

function addCard(element) {
  const newCard = createCard(element);
  renderCard(newCard);
};

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

  /*Если я правильно идею изначально, то проблема её реализации была вот в этом селекторе ↓. Удаляя renderCard из функции сreateCard, карточки не загружались на страницу, поскольку не были предварительно отрендерены. 
  Для рендера карточки перед развешиванием слушателей функция renderCard и стояла перед слушателями изначально. Когда я последовал по вашему пути, слушатели не находили карточку, а в консоли была ошибка. 
  Устранить её получилось через переменную let. Пройдя эти функции дебаггером я и увидел, что именно в приходит в этот слушатель и почему ваше замечание из ревью не получалось реализовать.*/
  newElement.querySelector('.elements__image').addEventListener('click', function() {
    openFullCardsPopup(cardImage, cardName);
  });  

  newElement.querySelector('.elements__delete-button').addEventListener('click', () => {
    deleteItem(newElement);
  });

  return newElement;
};

function addPopupSubmitHandler(evt) {
  evt.preventDefault()
  addCard({name: cardNameInput.value, link: cardLinkInput.value});
  closePopup(popupAddCard);
  resetInput(cardLinkInput, cardNameInput);
};

popupEditButton.addEventListener('click', function() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

popupEditCloseButton.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

formEditElement.addEventListener('submit', formSubmitHandler);

popupAddCardButton.addEventListener('click', function() {
  openPopup(popupAddCard);
});

popupAddCloseButton.addEventListener('click', function() {
  closePopup(popupAddCard);
});

 
popupFullCardButton.addEventListener('click', function() {
  closePopup(fullCardsPopup);
});

initialCards.forEach(addCard);

formAddElement.addEventListener('submit', addPopupSubmitHandler);