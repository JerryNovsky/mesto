export const formConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

export const initialCards = [
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

export const popupEditButton = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupEditCloseButton = document.querySelector('.popup__edit-close-button');
export const popupAddCloseButton = document.querySelector('.popup__add-close-button');
export const popupAddCardButton = document.querySelector('.profile__add-card-button');
export const formEditElement = document.querySelector('.popup__content_type_edit-profile');
export const formAddElement = document.querySelector('.popup__content_type_add-card');
export const popupFullCardButton = document.querySelector('.popup__cards-close-button');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__description');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');
export const cardNameInput = document.querySelector('.popup__input_type_card-name');
export const cardLinkInput = document.querySelector('.popup__input_type_card-link');
export const list = document.querySelector('.elements__cards');
export const itemTemplate = document.querySelector('#item_template').content;
export const fullCardsImage = document.querySelector('.popup__cards-image');
export const fullCardsDescription = document.querySelector('.popup__cards-description');
export const fullCardsPopup = document.querySelector('.popup_type_cards');