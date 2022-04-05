import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, subitHandler) {
        super(popupSelector);
        this._submitHandler = subitHandler;
        this._formElement = this._popupElement.querySelector(".popup__form");
    }

    _getInputValues() {
        const inputList = this._formElement.querySelectorAll(".popup__input");
        return {input1: inputList[0].value, input2: inputList[1].value};
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
}