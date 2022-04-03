export default class FormValidator {
    constructor(formSelector, validationKeys) {
        this._formElement = document.querySelector(formSelector);
        this._keys = validationKeys;
    }

    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        })
        this._setEventListeners();
    }

    _setEventListeners() {
        this._inputList = [...this._formElement.querySelectorAll(this._keys.inputSelector)];
        this._buttonElement = this._formElement.querySelector(this._keys.submitButtonSelector);
        this._toggleButtonState();
        this._formElement.addEventListener("reset", () => {
            this._toggleButtonState();
        })
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.popup__error_type_${inputElement.id}`);
        inputElement.classList.add(this._keys.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._keys.errorClass);
    };

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.popup__error_type_${inputElement.id}`);
        inputElement.classList.remove(this._keys.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._keys.errorClass); 
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._keys.inactiveButtonClass);
            this._buttonElement.setAttribute("disabled", true);
        } else {
            this._buttonElement.classList.remove(this._keys.inactiveButtonClass);
            this._buttonElement.removeAttribute("disabled");
        }
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };
}
