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
const popupImage = document.querySelector(".popout__image");
const popupImageTitle = document.querySelector(".popout__image-title");
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

function renderCard(cardName, cardLink) {
    const cardAdded = cardTemplate.querySelector(".gallery__cell").cloneNode(true);
    const cardTitle = cardAdded.querySelector(".gallery__title");
    const cardImage = cardAdded.querySelector(".gallery__image");
    const cardLike = cardAdded.querySelector(".gallery__button");
    const cardDelete = cardAdded.querySelector(".gallery__delete-button");
    cardTitle.textContent = cardName;
    cardImage.alt = `A picture of ${cardName}`;
    cardImage.src = cardLink; 
    cardImage.addEventListener("click", () => {
      popupImage.src = cardImage.src;
      popupImage.alt = cardImage.alt;
      popupImageTitle.textContent = cardTitle.textContent;
      togglePopup(popupImageVeil);
    });
    cardDelete.addEventListener("click", () => {
        cardAdded.remove();
    });
    cardLike.addEventListener("click", () => {
        cardLike.classList.toggle("gallery__button_active");
    });
    return cardAdded;
}

function createCard(name, link) {
  const card = renderCard(name, link);
  cardContainer.prepend(card);
}

initialCards.forEach(item => {
    createCard(item.name, item.link);
    return;
});

function togglePopup(container) {
  container.classList.toggle("invisible");
}

function exitPopup(evt) {
    const targ = evt.currentTarget;
    const container = targ.parentNode.parentNode;
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
    createCard(`${formTitle.value}`, formLink.value)
    exitPopup(evt);
});