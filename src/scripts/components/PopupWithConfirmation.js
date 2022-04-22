import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, clickHandler) {
        super(popupSelector);
        this._clickHandler = clickHandler;
        this._confirmButton = this._popupElement.querySelector(".popup__button");
    }

    setEventListeners() {
        this._confirmButton.addEventListener("click",() => {
            this._clickHandler();
        } )
        super.setEventListeners();
    }

    renderError = (message) => {
        this._confirmButton.textContent = message;
        this._confirmButton.classList.add("popup__button_status_error");
        this._confirmButton.setAttribute("disabled", true);
        setTimeout(() => {
            this._confirmButton.textContent = this._confirmButton.name;
            this._confirmButton.classList.remove("popup__button_status_error");
            this._confirmButton.removeAttribute("disabled");
        }, 3000);
    }

    open(obj) {
        this.focusedObj = obj;
        super.open();
    }
}