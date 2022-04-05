export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._closeButton = this._popupElement.querySelector(".popup__exit-button");
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _handleClickClose = (evt) => {
        if (evt.target.classList.contains("popup")) {
            this.close();
        }
    }

    close() {
        this._popupElement.classList.add("invisible");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    open() {
        this._popupElement.classList.remove("invisible");
        document.addEventListener("keydown", this._handleEscClose);
    }

    setEventListeners() {
        this._closeButton.addEventListener("click", () => {
            this.close();
        })
        this._popupElement.addEventListener("mousedown", this._handleClickClose);
    }
}