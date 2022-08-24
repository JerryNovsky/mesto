export default class Popup {
    constructor(selector) {
        this._selector = selector;
    };

    open() {
        this._selector.classList.add('popup_opened');
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt)
        });
    };

    close() {
        this._selector.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => {
            this._handleEscClose(evt)
        });
    };

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    };

    setEventListeners() {
        this._selector.querySelector('.popup__close-button').addEventListener('click', () => {
            this.close();
        });

        this._selector.addEventListener('mousedown', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            };
        });
    };
};