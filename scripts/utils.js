import Card from "./Card.js";
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupBio = document.querySelector("#edit-container");
const formEdit = document.querySelector("#edit-bio");
const inputName = document.querySelector("#name");
const inputAbout = document.querySelector("#about-me");
const popupAdd = document.querySelector("#add-container");
const formAdd = document.querySelector("#add-image");
const inputTitle = document.querySelector("#title");
const inputLink = document.querySelector("#image");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__career");

function openPopup(container) {
    container.classList.remove("invisible");
    document.addEventListener("mousedown", closePopupCaller);
    document.addEventListener("keydown", closePopupCaller);
}
  
function closePopup(container) {
    container.classList.add("invisible");
    document.removeEventListener("mousedown", closePopupCaller);
    document.removeEventListener("keydown", closePopupCaller);
}

function closeOpenedPopup() {
    const openedPopup = document.querySelector(".popup:not(.invisible)");
    const openedForm = openedPopup.querySelector(".popup__form");
    closePopup(openedPopup);
    openedForm.reset();
}

function closePopupCaller(evt) {
    if (evt.target.classList.contains("popup")) {
      closeOpenedPopup();
    }
    else if (evt.key === "Escape") {
      closeOpenedPopup();
    }
}

function addExitEventListeners() {
    const exitButtons = Array.from(document.querySelectorAll(".popup__exit-button"));
    exitButtons.forEach((button) => {
      button.addEventListener("click", closeOpenedPopup);
    })
}
  
addExitEventListeners();

editButton.addEventListener("click", () => {
    const nameValue = profileName.textContent;
    const aboutValue = profileAbout.textContent;
    inputName.value = nameValue;
    inputAbout.value = aboutValue;
    openPopup(popupBio);
});

addButton.addEventListener("click", () => {
    openPopup(popupAdd);
})

formEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closeOpenedPopup();
});

formAdd.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const addedCard = new Card(inputTitle.value, inputLink.value, "#card-template");
    addedCard.renderCard();
    closeOpenedPopup();
    formAdd.reset();
});

export { formAdd, formEdit, openPopup };