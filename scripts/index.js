const editButton = document.querySelector(".profile__edit-button");
const exitBio = document.querySelector("#exit-bio");
const exitAdd = document.querySelector("#exit-add");
const exitImage = document.querySelector("#exit-image");
const addButton = document.querySelector(".profile__add-button");
const popout = document.querySelector(".popout");
const formBio = document.querySelector("#edit-container");
const popoutEdit = document.querySelector("#edit-bio");
const formName = document.querySelector("#name");
const formAbout = document.querySelector("#about-me");
const formAdd = document.querySelector("#add-container");
const popoutAdd = document.querySelector("#add-image");
const formTitle = document.querySelector("#title");
const formLink = document.querySelector("#image");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__career");
const cardContainer = document.querySelector(".gallery__container");
const popoutImage = document.querySelector(".popout__image");
const popoutImageTitle = document.querySelector(".popout__image-title");
const popoutImageVeil = document.querySelector("#image-container");
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

function addCard(cardName, cardLink) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardAdded = cardTemplate.querySelector(".gallery__cell").cloneNode(true);
    const cardTitle = cardAdded.querySelector(".gallery__title");
    const cardImage = cardAdded.querySelector(".gallery__image");
    const cardLike = cardAdded.querySelector(".gallery__button");
    const cardDelete = cardAdded.querySelector(".gallery__delete-button");
    cardTitle.textContent = cardName;
    cardImage.alt = `A picture of ${cardName}`;
    cardImage.src = cardLink; 
    cardImage.addEventListener("click", () => {
      popoutImage.src = cardImage.src;
      popoutImage.alt = cardImage.alt;
      popoutImageTitle.textContent = cardTitle.textContent;
      popoutImageVeil.style.opacity = 1;
      popoutImageVeil.style.visibility = "visible";
    })
    cardDelete.addEventListener("click", () => {
        cardAdded.remove();
    });
    cardLike.addEventListener("click", () => {
        cardLike.classList.toggle("gallery__button_active");
    });
    cardContainer.prepend(cardAdded);
}

initialCards.forEach(item => {
    addCard(item.name, item.link);
    return;
});

function exitPopout(evt) {
    const targ = evt.currentTarget;
    const container = targ.parentNode.parentNode;
    formName.value = "";
    formAbout.value = "";
    formTitle.value = "";
    formLink.value = "";
    container.style.opacity = 0;
    container.style.visibility = "hidden";
}

function submitBio(evt) {
    evt.preventDefault();
    profileName.textContent = formName.value;
    profileAbout.textContent = formAbout.value;
    exitPopout(evt);
}

editButton.addEventListener("click", () => {
    const nameValue = profileName.textContent;
    const aboutValue = profileAbout.textContent;
    formName.value = nameValue;
    formAbout.value = aboutValue;
    formBio.style.opacity = 1;
    formBio.style.visibility = "visible";
});

addButton.addEventListener("click", () => {
    formAdd.style.opacity = 1;
    formAdd.style.visibility = "visible";
})

exitBio.addEventListener("click", exitPopout);

exitAdd.addEventListener("click", exitPopout);

exitImage.addEventListener("click", exitPopout);

popoutEdit.addEventListener("submit", submitBio);

popoutAdd.addEventListener("submit", (evt) => {
    evt.preventDefault();
    addCard(`${formTitle.value}`, formLink.value)
    exitPopout(evt);
});