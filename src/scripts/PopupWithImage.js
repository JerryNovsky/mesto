import Popup from "./Popup.js";

import { fullCardsImage, fullCardsDescription } from './constants.js';

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open(data) {
        fullCardsImage.src = data.link;
        fullCardsDescription.alt = data.name;
        fullCardsDescription.textContent = data.name;
        super.open();
    }
}