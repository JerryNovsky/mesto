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
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');
let cardNameInput = document.querySelector('.popup__input_type_card-name');
let cardLinkInput = document.querySelector('.popup__input_type_card-link');

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

function createCard(el) {
  const newElement = itemTemplate.querySelector('.elements__card').cloneNode(true);
  const likeButton = newElement.querySelector('.elements__like-button');
  let cardImage = newElement.querySelector('.elements__image');
  let cardName = newElement.querySelector('.elements__name');
    
  cardImage.src = el.link;
  cardImage.setAttribute("alt", el.name);
  cardName.textContent = el.name;
  renderCard(newElement);

  likeButton.addEventListener('click', () => {
    likeCheck(likeButton);
  });

  document.querySelector('.elements__image').addEventListener('click', function() {
    openFullCardsPopup(cardImage, cardName);
  });  

  newElement.querySelector('.elements__delete-button').addEventListener('click', () => {
    deleteItem(newElement);
  }); 
};

function addPopupSubmitHandler(evt) {
  evt.preventDefault()
  const newElement = itemTemplate.querySelector('.elements__card').cloneNode(true);
  let imageLink = newElement.querySelector('.elements__image');
  let imageName = newElement.querySelector('.elements__name');
  
  imageLink.src = cardLinkInput.value;
  imageName.textContent = cardNameInput.value;

  newElement.querySelector('.elements__delete-button').addEventListener('click', () => {
    deleteItem(newElement);
});

  const likeButton = newElement.querySelector('.elements__like-button');

  likeButton.addEventListener('click', () => {
    likeCheck(likeButton);
});

  newElement.querySelector('.elements__image').addEventListener('click', function() {
    openFullCardsPopup(imageLink, imageName);
});

  list.prepend(newElement);
  closePopup(popupAddCard);
  resetInput(cardLinkInput, cardNameInput);
};

popupEditButton.addEventListener('click', function() {
  popupEditProfile.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

popupEditCloseButton.addEventListener('click', function() {
  closePopup(popupEditProfile);
});

formEditElement.addEventListener('submit', formSubmitHandler);

popupAddCardButton.addEventListener('click', function() {
  popupAddCard.classList.add('popup_opened');
});

popupAddCloseButton.addEventListener('click', function() {
  closePopup(popupAddCard);
});

 
popupFullCardButton.addEventListener('click', function() {
  closePopup(fullCardsPopup);
});

initialCards.forEach(createCard);

formAddElement.addEventListener('submit', addPopupSubmitHandler);