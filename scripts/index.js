let likeButtons = document.querySelectorAll(".gallery__button");
let popoutButton = document.querySelector(".profile__edit-button");
let submitButton = document.querySelector(".popout__submit-button");
let exitButton = document.querySelector(".popout__exit-button");
let formName = document.querySelector("#name");
let formAbout = document.querySelector("#about-me");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__career");
let popout = document.querySelector(".popout");

function openPopout(opened) {
    let nameValue = profileName.innerText;
    let aboutValue = profileAbout.innerText;
    formName.setAttribute("value", nameValue);
    formAbout.setAttribute("value", aboutValue);
    popout.classList.toggle("popout_visible");
    //why does this not reset the values for the text inputs everytime it's activated?
}

function exitPopout(exited) {
    formName.value = " ";
    formAbout.value = " ";
    popout.classList.toggle("popout_visible");
    //yet this one does empty the values every time it's activated... I don't get it
}

function submitPopout(evt) {

    evt.preventDefault();

    profileName.textContent = formName.value;
    profileAbout.textContent = formAbout.value;
    popout.classList.toggle("popout_visible");
}

function likePicture(clicked) {
    likeButtons.item(this.id).classList.toggle("gallery__button_active");
}


function addEventListenerList(list, way) {
    for (i=0; i < list.length; i++) {
        list.item(i).setAttribute("id", i);
        list.item(i).addEventListener("click", way);
        console.log(i);
    }
}

addEventListenerList(likeButtons, likePicture);
popoutButton.addEventListener("click", openPopout);
exitButton.addEventListener("click", exitPopout);
submitButton.addEventListener("click", submitPopout);
//for whatever reason if I try to use "submit" instead of "click" the submitPopout function won't run