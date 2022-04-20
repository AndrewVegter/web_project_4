const validationObj = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}

const cardSelectorList = {
  templateSelector: "#card-template",
  likeActiveClass: "gallery__button_active",
  deleteSelector: ".gallery__delete-button",
  likeSelector: ".gallery__button",
  imageSelector: ".gallery__image",
  titleSelector: ".gallery__title",
  cardSelector: ".gallery__cell",
  likeCountSelector: ".gallery__like-count"
}

const inputName = document.querySelector("#name");
const inputJob = document.querySelector("#job");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__avatar-button");
const formSelectors = ["#edit-bio", "#add-image", "#edit-avatar"];
const userSelectors = {nameSelector: ".profile__name", jobSelector: ".profile__career", imageSelector: ".profile__avatar"};


export { validationObj, cardSelectorList, inputName, inputJob, editButton, addButton, formSelectors, userSelectors, avatarButton }