const validationObj = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}

function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(`${obj.formSelector}`));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, obj);
    });
}

function setEventListeners(form, obj) {
    const inputList = Array.from(form.querySelectorAll(`${obj.inputSelector}`));
    const buttonElement = form.querySelector(`${obj.submitButtonSelector}`);
    toggleButtonState(inputList, buttonElement, obj);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(form, inputElement, obj);
            toggleButtonState(inputList, buttonElement, obj);
        });
    });
}

function checkInputValidity(formElement, inputElement, obj) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideInputError(formElement, inputElement, obj);
    }
};

function showInputError(form, inputElement, errorMessage, obj) {
    const errorElement = form.querySelector(`.popup__error_type_${inputElement.id}`);
    inputElement.classList.add(`${obj.inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${obj.errorClass}`);
};

function hideInputError(form, inputElement, obj) {
    const errorElement = form.querySelector(`.popup__error_type_${inputElement.id}`);
    inputElement.classList.remove(`${obj.inputErrorClass}`);
    errorElement.textContent = "";
    errorElement.classList.remove(`${obj.errorClass}`); 
}

function toggleButtonState(inputList, buttonElement, obj) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(`${obj.inactiveButtonClass}`);
        buttonElement.setAttribute("disabled", true);
    } else {
        buttonElement.classList.remove(`${obj.inactiveButtonClass}`);
        buttonElement.removeAttribute("disabled");
    }
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

enableValidation(validationObj); 