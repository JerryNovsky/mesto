import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popup, fullCardImage, fullCardDescription) {
        super(popup);
        this._fullCardImage = document.querySelector(fullCardImage);
        this._fullCardDescription = document.querySelector(fullCardDescription);
    }

    open(name, link) {
        this._fullCardImage.src = link;
        this._fullCardDescription.alt = name;
        this._fullCardDescription.textContent = name;
        super.open();
    }
}