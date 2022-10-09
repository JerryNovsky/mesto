import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(selector, { submitCallback }) {
        super(selector);
        this._popup = document.querySelector(selector);
        this._formElement = this._popup.querySelector('.popup__form');
        this._submitCallback = submitCallback;
    }

    open(card) {
        super.open();
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._card);
        });
    }
}