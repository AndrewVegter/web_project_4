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
      togglePopup(popupImageVeil);
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

function togglePopup(container) {
  container.classList.toggle("invisible");
}

function exitPopup(evt) {
    const targ = evt.currentTarget;
    const container = targ.closest(".popup");
    togglePopup(container);
}

function resetAdd(evt) {
  popupAdd.reset();
  exitPopup(evt);
}

function submitBio(evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileAbout.textContent = formAbout.value;
    exitPopup(evt);
}

editButton.addEventListener("click", () => {
    const nameValue = profileName.textContent;
    const aboutValue = profileAbout.textContent;
    formName.value = nameValue;
    formAbout.value = aboutValue;
    togglePopup(formBio);
});

addButton.addEventListener("click", () => {
    togglePopup(formAdd);
})

exitBio.addEventListener("click", exitPopup);

exitAdd.addEventListener("click", resetAdd);

exitImage.addEventListener("click", exitPopup);

popupEdit.addEventListener("submit", submitBio);

popupAdd.addEventListener("submit", (evt) => {
    evt.preventDefault();
    renderCard(`${formTitle.value}`, formLink.value)
    exitPopup(evt);
});