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
    closePopup(openedPopup);
}

function closePopupCaller(evt) {
    if (evt.target.classList.contains("popup")) {
      closeOpenedPopup();
    }
    else if (evt.key === "Escape") {
      closeOpenedPopup();
    }
}

export { openPopup, closeOpenedPopup };