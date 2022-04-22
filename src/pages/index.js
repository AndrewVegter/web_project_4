import "./index.css";
import Api from "../scripts/components/Api.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";
import UserInfo from "../scripts/components/UserInfo.js";
import { validationObj, cardSelectorList, inputName, 
  inputJob, editButton, addButton, formSelectors, userSelectors, avatarButton } from "../scripts/utils/constants.js";

//Here to line 120: initiating classes

const projectApi = new Api("https://around.nomoreparties.co/v1/group-12", 
{ authorization: "1ef576b8-6d38-4f6c-aed4-fbb58187f608", "Content-Type": "application/json" });

const userBio = new UserInfo({ selectors: userSelectors });

const cardSection = new Section({
  renderer: (cardData) => {
  const cardItem = new Card({ data: cardData, 
  clickHandler: (title, link) => {popupImage.open(title, link)}, 
  likeHandler: (obj) => {
    if (!obj.isLiked) {
      projectApi.likeCard(obj.id)
      .then((res) => {
        obj.likeCard();
        obj.setLikeCount(res.likes.length);
      })
      .catch(err => console.log(err))}
    else {
      projectApi.unlikeCard(obj.id)
      .then((res) => {
        obj.unlikeCard();
        obj.setLikeCount(res.likes.length);
      })
      .catch(err => console.log(err))}
    }, 
  deleteHandler: (obj) => {
    deleteConfirmaton.open(obj);
  }, 
  userID: userBio.id}, 
  cardSelectorList);
  const isUserCard = cardData.owner._id === userBio.id;
  const cardElement = cardItem.initiateCard(isUserCard);
  return cardElement;
}
}, ".gallery__container");

const bioForm = new PopupWithForm("#edit-container", (data) => {
  bioForm.renderLoading();
  projectApi.updateUserData(data)
  .then((res) => {
    bioForm.renderSuccess();
    userBio.setUserInfo(res);
    setTimeout(() => bioForm.close(), 350);
  })
  .catch((err) => {
    console.log(err);
    bioForm.renderError(err);
  })
  .finally(() => {
    setTimeout(() => bioForm.restoreButtonDefaults(), 1500);
  })
});

const addForm = new PopupWithForm("#add-container", (data) => {
  addForm.renderLoading();
  projectApi.addNewCard(data)
  .then((res) => {
    addForm.renderSuccess();
    cardSection.addItem(res, true);
    setTimeout(() => addForm.close(), 350);
  })
  .catch((err) => {
    console.log(err);
    addForm.renderError(err);
  })
  .finally(() => {
    setTimeout(() => addForm.restoreButtonDefaults(), 1500);
  })
})

const avatarForm = new PopupWithForm("#avatar-container", (data) => {
  avatarForm.renderLoading();
  projectApi.updateUserAvatar(data)
  .then((res) => {
    avatarForm.renderSuccess();
    userBio.setUserInfo(res);
    setTimeout(() => avatarForm.close(), 350);
  })
  .catch((err) => {
    console.log(err);
    avatarForm.renderError(err);
  })
  .finally(() => {
    setTimeout(() => avatarForm.restoreButtonDefaults(), 1500);
  })
})

const deleteConfirmaton = new PopupWithConfirmation("#delete-container", () => {
  projectApi.deleteCard(deleteConfirmaton.focusedObj.id)
  .then(() => {
    deleteConfirmaton.focusedObj.deleteCard();
    deleteConfirmaton.focusedObj = null;
    deleteConfirmaton.close();
  })
  .catch((err) => {
    console.log(err);
    deleteConfirmaton.renderError("Failed to delete");
  })
})

const popupImage = new PopupWithImage("#image-container");

formSelectors.forEach((selector) => {
  const validatedForm = new FormValidator(selector, validationObj);
  validatedForm.enableValidation();
});
//Also, sorry if I wasn't allowed to add all these extra UX changes, just thought it looked nice and was a good way to communicate success/failure

//here to line 145: calling methods
Promise.all([projectApi.getUserInfo(), projectApi.getInitialCards()])
  .then(([userData, cards]) => {
    userBio.setUserInfo(userData);
    userBio.id = userData._id;
    cards.forEach((item) => {
      cardSection.addItem(item, false);
    })
  })
  .catch(([userErr, cardsErr]) => {
    console.log(userErr);
    console.log(cardsErr);
  });

bioForm.setEventListeners();

addForm.setEventListeners();

avatarForm.setEventListeners();

deleteConfirmaton.setEventListeners();

popupImage.setEventListeners();

//here to end: adding event listeners
editButton.addEventListener("click", () => {
  bioForm.setInputValues(userBio.getUserInfo());
  bioForm.open();
});

addButton.addEventListener("click", () => {
  addForm.open();
})

avatarButton.addEventListener("click", () => {
  avatarForm.open();
})

