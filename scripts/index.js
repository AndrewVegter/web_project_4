const editButton = document.querySelector(".profile__edit-button");
const exitBio = document.querySelector("#exit-bio");
const exitAdd = document.querySelector("#exit-add");
const exitImage = document.querySelector("#exit-image");
const addButton = document.querySelector(".profile__add-button");
const formBio = document.querySelector("#edit-container");
const popupEdit = document.querySelector("#edit-bio");
const formName = document.querySelector("#name");
const formAbout = document.querySelector("#about-me");
const formAdd = document.querySelector("#add-container");
const popupAdd = document.querySelector("#add-image");
const formTitle = document.querySelector("#title");
const formLink = document.querySelector("#image");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__career");
const cardContainer = document.querySelector(".gallery__container");
const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__image-title");
const popupImageVeil = document.querySelector("#image-container");
const cardTemplate = document.querySelector("#card-template").content;
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

function prepCard(cardName, cardLink) {
    const preppedCard = cardTemplate.querySelector(".gallery__cell").cloneNode(true);
    const cardTitle = preppedCard.querySelector(".gallery__title");
    const cardImage = preppedCard.querySelector(".gallery__image");
    const cardLike = preppedCard.querySelector(".gallery__button");
    const cardDelete = preppedCard.querySelector(".gallery__delete-button");
    cardTitle.textContent = cardName;
    cardImage.alt = `A picture of ${cardName}`;
    cardImage.src = cardLink; 
    cardImage.addEventListener("click", () => {
      popupImage.src = cardLink;
      popupImage.alt = cardImage.alt;
      popupImageTitle.textContent = cardName;
      openPopup(popupImageVeil);
    });
    cardDelete.addEventListener("click", () => {
        preppedCard.remove();
    });
    cardLike.addEventListener("click", () => {
        cardLike.classList.toggle("gallery__button_active");
    });
    return preppedCard;
}

function renderCard(name, link) {
  const card = prepCard(name, link);
  cardContainer.prepend(card);
}

initialCards.forEach(item => {
    renderCard(item.name, item.link);
    return;
});

function openPopup(container) {
  container.classList.remove("invisible");
  document.addEventListener("mousedown", exitPopupCaller);
  document.addEventListener("keydown", exitPopupCaller);
}

function closePopup(container) {
  container.classList.add("invisible");
}
function submitBio(evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileAbout.textContent = formAbout.value;
    exitPopup();
}

editButton.addEventListener("click", () => {
    const nameValue = profileName.textContent;
    const aboutValue = profileAbout.textContent;
    formName.value = nameValue;
    formAbout.value = aboutValue;
    openPopup(formBio);
});

addButton.addEventListener("click", () => {
    openPopup(formAdd);
    const inputList = Array.from(formAdd.querySelectorAll(`${validationObj.inputSelector}`))
    const buttonElement = formAdd.querySelector(`${validationObj.submitButtonSelector}`);
    toggleButtonState(inputList, buttonElement, validationObj);
})

exitBio.addEventListener("click", exitPopup);

exitAdd.addEventListener("click", exitPopup);

exitImage.addEventListener("click", exitPopup);

popupEdit.addEventListener("submit", submitBio);

popupAdd.addEventListener("submit", (evt) => {
    evt.preventDefault();
    renderCard(formTitle.value, formLink.value)
    exitPopup();
    popupAdd.reset();
});

function exitPopupCaller(evt) {
  if (evt.target.classList.contains("popup")) {
    exitPopup();
  }
  else if (evt.key === "Escape") {
    exitPopup();
  }
}

function exitPopup() {
  const containers = Array.from(document.querySelectorAll(".popup"));
  containers.forEach((container) => {
    if (!container.classList.contains("invisible")) {
      closePopup(container);
    }
  })
  document.removeEventListener("mousedown", exitPopupCaller);
  document.removeEventListener("keydown", exitPopupCaller);
}

/*function exitPopup(evt) {
    const container = evt.target.closest(".popup");
    closePopup(container);
    document.removeEventListener("mousedown", exitPopupAlternative);
    document.removeEventListener("keydown", exitPopupAlternative);
}*/