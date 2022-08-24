import Popup from "./Popup.js";
import { cardNameInput, cardLinkInput } from "./constants.js";

export default class PopupWithForm extends Popup {
    constructor(selector, submitCallback) {
        super(selector);
        this._submitCallback = submitCallback;
    }

    _getInputValues() {
        this._object = { name: cardNameInput.value, link: cardLinkInput.value };
        return this._object;
    }

    setEventListeners(formElement) {
        super.setEventListeners();
        formElement.addEventListener('submit', this._submitCallback);
    }

    close() {
        super.close();
        cardLinkInput.value = '';
        cardNameInput.value = '';
    }
}