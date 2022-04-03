import "./index.css";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import { validationObj, initialCards, cardSelectorList, inputName, 
  inputAbout, editButton, addButton, formSelectors, userSelectors } from "../scripts/utils/constants.js";

const userBio = new UserInfo({ selectors: userSelectors });

const bioForm = new PopupWithForm("#edit-container", (formObj) => {
  const inputValues = formObj._getInputValues();
  userBio.setUserInfo({ name: inputValues.input1, job: inputValues.input2 })
});

const addForm = new PopupWithForm("#add-container", (formObj) => {
  const inputValues = formObj._getInputValues();
  const translatedValues = {name: inputValues.input1, link: inputValues.input2};
  const userCard = new Section({
    items: translatedValues,
    renderer: (item) => {
      const cardItem = new Card({ data: item, clickHandler: (title, link) => {popupImage.open(title, link)}}, cardSelectorList);
      const cardElement = cardItem.initiateCard();
      userCard.addItem(cardElement);
    }
  }, ".gallery__container")
  userCard.renderItems();
})

const popupImage = new PopupWithImage("#image-container");

const initialCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardItem = new Card({ data: item, clickHandler: (title, link) => {popupImage.open(title, link)}}, cardSelectorList);
    const cardElement = cardItem.initiateCard();
    initialCardList.addItem(cardElement);
  }
}, ".gallery__container");

formSelectors.forEach((selector) => {
  const validatedForm = new FormValidator(selector, validationObj);
  validatedForm.enableValidation();
});

initialCardList.renderItems();

bioForm.setEventListeners();

addForm.setEventListeners();

popupImage.setEventListeners();

editButton.addEventListener("click", () => {
  const inputPrefills = userBio.getUserInfo();
  inputName.value = inputPrefills.name;
  inputAbout.value = inputPrefills.job;
  bioForm.open();
});

addButton.addEventListener("click", () => {
  addForm.open();
})
