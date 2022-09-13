import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popup, fullCardImage, fullCardDescription) {
        super(popup);
        this._fullCardImage = document.querySelector(fullCardImage);
        this._fullCardDescription = document.querySelector(fullCardDescription);
    }

    open(data) {
        this._fullCardImage.src = data.link;
        this._fullCardDescription.alt = data.name;
        this._fullCardDescription.textContent = data.name;
        super.open();
    }
}