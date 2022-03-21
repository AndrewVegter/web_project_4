import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { validationObj, initialCards } from "./utils/constants.js";
import { openPopup,  closeOpenedPopup } from "./utils/utils.js";

//declaring variables section//
const popupBio = document.querySelector("#edit-container");
const formBio = popupBio.querySelector("#edit-bio");
const inputName = formBio.querySelector("#name");
const inputAbout = formBio.querySelector("#about-me");
const popupAdd = document.querySelector("#add-container");
const formAdd = popupAdd.querySelector("#add-image");
const inputTitle = formAdd.querySelector("#title");
const inputLink = formAdd.querySelector("#image");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__career");
const cardContainer = document.querySelector(".gallery__container");
const exitButtons = document.querySelectorAll(".popup__exit-button");
const popupImageVeil = document.querySelector("#image-container");
const popupImage = popupImageVeil.querySelector(".popup__image");
const popupImageTitle = popupImageVeil.querySelector(".popup__image-title");
const forms = [formAdd, formBio];

//declaring functions section//
function addCard(name, link, templateSelector) {
  const newCard = new Card (name, link, templateSelector);
  newCard.renderCard(cardContainer);
  //Would have named this function renderCard like you suggested but I already used that name in the class and it seemed confusing//
}

//iterating arrays section//
initialCards.forEach((card) => {
  addCard(card.name, card.link, "#card-template");
});

forms.forEach((form) => {
  const validatedForm = new FormValidator(form, validationObj);
  validatedForm.enableValidation();
});

exitButtons.forEach((button) => {
  button.addEventListener("click", closeOpenedPopup);
});

//adding event listeners section//
editButton.addEventListener("click", () => {
  const nameValue = profileName.textContent;
  const aboutValue = profileAbout.textContent;
  formBio.reset();
  inputName.value = nameValue;
  inputAbout.value = aboutValue;
  openPopup(popupBio);
});

addButton.addEventListener("click", () => {
  formAdd.reset();
  openPopup(popupAdd);
})

formBio.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closeOpenedPopup();
});

formAdd.addEventListener("submit", (evt) => {
    evt.preventDefault();
    addCard(inputTitle.value, inputLink.value, "#card-template");
    closeOpenedPopup();
    formAdd.reset();
});

export { popupImageVeil, popupImage, popupImageTitle }