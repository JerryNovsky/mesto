const popupEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupEditCloseButton = document.querySelector('.popup__edit-close-button');
const popupAddCloseButton = document.querySelector('.popup__add-close-button');
const popupAddCardButton = document.querySelector('.profile__add-card-button');

let formEditElement = document.querySelector('.popup__content_type_edit-profile');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');

popupEditButton.addEventListener('click', function() {
    popupEditProfile.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

function closeEditPopup () {
    popupEditProfile.classList.remove('popup_opened');
};

popupEditCloseButton.addEventListener('click', function() {
    closeEditPopup();
});

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeEditPopup();
};

formEditElement.addEventListener('submit', formSubmitHandler);


popupAddCardButton.addEventListener('click', function() {
    popupAddCard.classList.add('popup_opened');
});

function closeAddPopup () {
    popupAddCard.classList.remove('popup_opened');
};

popupAddCloseButton.addEventListener('click', function() {
    closeAddPopup();
});


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


  function deleteItem(item) {
    item.remove();
}


const list = document.querySelector('.elements__cards');
const itemTemplate = document.querySelector('.item_template').content;
let cardName = document.querySelector('.popup__input_type_card-name');
let cardLink = document.querySelector('.popup__input_type_card-link');
let formAddElement = document.querySelector('.popup__content_type_add-card');
const popupFullCardButton = document.querySelector('.popup__cards-close-button');

function closeFullCardPopup() {
  fullCardsPopup.classList.remove('popup_opened');
};

popupFullCardButton.addEventListener('click', closeFullCardPopup);

function startItem(el) {
        const startElement = itemTemplate.querySelector('.elements__card').cloneNode(true);
        startElement.querySelector('.elements__image').src = el.link;
        startElement.querySelector('.elements__name').textContent = el.name;
        list.prepend(startElement);
        
        const likeButton = document.querySelector('.elements__like-button');
        likeButton.addEventListener('click', likeCheck);

        function likeCheck() { 
            console.log('like');
            likeButton.classList.toggle('elements__like-button_active');
        };
        
        startElement.querySelector('.elements__delete-button').addEventListener('click', () => {
            deleteItem(startElement);
        }); 
};

initialCards.forEach(startItem);

const fullCardsPopup = document.querySelector('.popup__cards');
let imageLink = document.querySelector('.elements__image');
let imageDescription = document.querySelector('.elements__description');

function openFullCardsPopup (imageLink, imageDescription) {
  fullCardsPopup.querySelector('.popup__cards-image').src = imageLink.src;
  fullCardsPopup.querySelector('.popup__cards-description').textContent = imageDescription.textContent;
  fullCardsPopup.classList.add('popup_opened');
  console.log('click');
}


document.querySelector('.elements__image').addEventListener('click', function() {
  openFullCardsPopup(imageLink, imageDescription);
});



function renderItem(card) {
    card.preventDefault()
    const newElement = itemTemplate.querySelector('.elements__card').cloneNode(true);
    let cardName = document.querySelector('.popup__input_type_card-name');
    let cardLink = document.querySelector('.popup__input_type_card-link');
    
    newElement.querySelector('.elements__image').src = cardLink.value;
    newElement.querySelector('.elements__name').textContent = cardName.value;
    
  
    
    newElement.querySelector('.elements__delete-button').addEventListener('click', () => {
      deleteItem(newElement);
  });

    list.prepend(newElement);
    closeAddPopup();
};

formAddElement.addEventListener('submit', renderItem);

