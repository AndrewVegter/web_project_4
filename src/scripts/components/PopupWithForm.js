import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._formElement = this._popupElement.querySelector(".popup__form");
        this._submitButton = this._formElement.querySelector(".popup__button");
    }

    _getInputValues() {
        const inputList = this._formElement.querySelectorAll(".popup__input");
        const results = {};
        inputList.forEach((input) => {
            results[`${input.name}`] = input.value;
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

    close() {
        this._formElement.reset();
        super.close();
    }

    open() {
        this._formElement.reset(); //odd that this reset triggers the reset listener in the validator, when the one in close does not//
        super.open();
    }

    renderLoading = (isLoading) => {
        if (isLoading) {
            return this._submitButton.textContent = "Saving...";
        }
        return this._submitButton.textContent = this._submitButton.name; 
    }
}