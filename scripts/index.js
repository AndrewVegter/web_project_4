//let likeButtons = document.querySelectorAll(".gallery__button");
let popoutButton = document.querySelector(".profile__edit-button");
let exitButton = document.querySelector(".popout__exit-button");
let formName = document.querySelector("#name");
let formAbout = document.querySelector("#about-me");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__career");
let popout = document.querySelector(".popout");
let popoutForm = document.querySelector(".popout__container");

function openPopout() {
    let nameValue = profileName.textContent;
    let aboutValue = profileAbout.textContent;
    formName.value = nameValue;
    formAbout.value = aboutValue;
    popout.classList.toggle("popout_visible");
}

function exitPopout() {
    formName.value = " ";
    formAbout.value = " ";
    popout.classList.toggle("popout_visible");
}

function submitPopout(evt) {

    evt.preventDefault();

    profileName.textContent = formName.value;
    profileAbout.textContent = formAbout.value;
    exitPopout();
}

/*function likePicture(clicked) {
    likeButtons.item(this.id).classList.toggle("gallery__button_active");
}


function addEventListenerList(list, way) {
    for (i=0; i < list.length; i++) {
        list.item(i).setAttribute("id", i);
        list.item(i).addEventListener("click", way);
        console.log(i);
    }
}

addEventListenerList(likeButtons, likePicture);*/
popoutButton.addEventListener("click", openPopout);
exitButton.addEventListener("click", exitPopout);
popoutForm.addEventListener("submit", submitPopout);