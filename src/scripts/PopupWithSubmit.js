import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, { submitCallback }) {
        super(selector);
        this._popup = document.querySelector(selector);
        this._formElement = this._popup.querySelector('.popup__form');
        this._submitCallback = submitCallback;
    }

    open(id, deletedElement) {
        super.open();
        this._id = id;
        this._deletedElement = deletedElement;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._id, this._deletedElement);
        });
    }
}