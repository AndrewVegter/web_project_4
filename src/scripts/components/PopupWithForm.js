import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._formElement = this._popupElement.querySelector(".popup__form");
        this._submitButton = this._formElement.querySelector(".popup__button");
        this._inputList = this._formElement.querySelectorAll(".popup__input");
    }

    _getInputValues() {
        const results = {};
        this._inputList.forEach((input) => {
            results[input.name] = input.value;
        })
        return results;
    }

    setEventListeners() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const inputs = this._getInputValues();
            this._submitHandler(inputs);
        })
        super.setEventListeners(); 
    }

    setInputValues = (data) => {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        })
    }

    close() {
        this._formElement.reset();
        super.close();
    }

    renderLoading = () => {
        this._submitButton.textContent = "Saving...";
        this._submitButton.setAttribute("disabled", true);
    }

    renderError = (error) => {
        this._submitButton.textContent = error;
        this._submitButton.classList.add("popup__button_status_error");
    }

    renderSuccess = () => {
        this._submitButton.textContent = "Saved!";
        this._submitButton.classList.add("popup__button_status_success")
    }

    restoreButtonDefaults = () => {
        this._submitButton.textContent = this._submitButton.name;
        this._submitButton.classList.remove("popup__button_status_error", "popup__button_status_success");
        this._submitButton.removeAttribute("disabled");
    }
}