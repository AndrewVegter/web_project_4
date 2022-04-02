const validationObj = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}

const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

const cardSelectorList = {
  templateSelector: "#card-template",
  likeActiveClass: "gallery__button_active",
  deleteSelector: ".gallery__delete-button",
  likeSelector: ".gallery__button",
  imageSelector: ".gallery__image",
  titleSelector: ".gallery__title",
  cardSelector: ".gallery__cell"
}

const popupImageVeil = document.querySelector("#image-container");
const popupImage = popupImageVeil.querySelector(".popup__image");
const popupImageTitle = popupImageVeil.querySelector(".popup__image-title");
const inputName = document.querySelector("#name");
const inputAbout = document.querySelector("#about-me");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const formSelectors = ["#edit-bio", "#add-image"];
const userSelectors = {nameSelector: ".profile__name", jobSelector: ".profile__career"};

export { validationObj, initialCards, cardSelectorList, popupImage, 
  popupImageTitle, inputName, inputAbout, editButton, addButton, formSelectors, userSelectors }