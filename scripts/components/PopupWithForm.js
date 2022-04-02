import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, subitHandler) {
        super(popupSelector);
        this._submitHandler = subitHandler;
        this._formElement = this._popupElement.querySelector(".popup__form");
    }

    _getInputValues() {
        const InputList = this._formElement.querySelectorAll(".popup__input");
        return {input1: InputList[0].value, input2: InputList[1].value};
    }

    setEventListeners() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault;
            this._submitHandler(this);
            this.close();
        })
        super.setEventListeners(); 
    }

    close() {
        this._formElement.reset();
        super.close();
    }
}