export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector);
        this._closeButton = this._popupElement.querySelector(".popup__exit-button");
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _handleClickClose(evt) {
        if (evt.target.classList.contains("popup")) {
            this.close();
        }
    }

    close() {
        this._popupElement.classList.add("invisible");
    }

    open() {
        this._popupElement.classList.remove("invisible");
    }

    setEventListeners() {
        this._closeButton.addEventListener("click", () => {
            this.close();
        })
        this._popupElement.addEventListener("mousedown", (evt) => {
            this._handleClickClose(evt)
        });
        document.addEventListener("keydown", (evt) => {
            this._handleEscClose(evt);
        });
    }
}