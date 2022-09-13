import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, { submitCallback }) {
        super(selector);
        this._popup = document.querySelector(selector);
        this._submitCallback = submitCallback;
        this._formElement = this._popup.querySelector('.popup__form');
        this.inputArray = Array.from(this._formElement.querySelectorAll('.popup__input'));
        this._nameInput = this._formElement.querySelector('.popup__input_type_card-name');
        this._linkInput = this._formElement.querySelector('.popup__input_type_card-link');
    }

    _getInputValues() {
        this._object = {};
        this.inputArray.forEach(input => {
            this._object[input.name] = input.value;
        })
        return this._object;
    }

    setEventListeners(formElement) {
        super.setEventListeners();
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._nameInput.value = '';
        this._linkInput.value = '';
    }
}