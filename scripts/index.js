let editButton = document.querySelector(".profile__edit-button");
let exitBio = document.querySelector("#exit-bio");
let exitAdd = document.querySelector("#exit-add");
let exitImage = document.querySelector("#exit-image");
let addButton = document.querySelector(".profile__add-button");
let popout = document.querySelector(".popout");
let formBio = document.querySelector("#edit-container");
let popoutEdit = document.querySelector("#edit-bio");
let formName = document.querySelector("#name");
let formAbout = document.querySelector("#about-me");
let formAdd = document.querySelector("#add-container");
let popoutAdd = document.querySelector("#add-image");
let formTitle = document.querySelector("#title");
let formLink = document.querySelector("#image");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__career");
let cardContainer = document.querySelector(".gallery__container");
let popoutImage = document.querySelector(".popout__image");
let popoutImageTitle = document.querySelector(".popout__image-title");
let popoutImageVeil = document.querySelector("#image-container");
let initialCards = [
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
    let cardTemplate = document.querySelector("#card-template").content;
    let cardAdded = cardTemplate.querySelector(".gallery__cell").cloneNode(true);
    let cardTitle = cardAdded.querySelector(".gallery__title");
    let cardImage = cardAdded.querySelector(".gallery__image");
    let cardLike = cardAdded.querySelector(".gallery__button");
    let cardDelete = cardAdded.querySelector(".gallery__delete-button");
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
    let targ = evt.currentTarget;
    let container = targ.parentNode.parentNode;
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
    let nameValue = profileName.textContent;
    let aboutValue = profileAbout.textContent;
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