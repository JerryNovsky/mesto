function showInputError(formElement, inputElement, errorMessage, validConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validConfig.errorClass);
};

function hideInputError(formElement, inputElement, validConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validConfig.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(validConfig.errorClass);
};

function isValid(formElement, inputElement, validConfig) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validConfig);
  } else {
    hideInputError(formElement, inputElement, validConfig);
  }
};

function setEventListeners(formElement, validConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validConfig.inputSelector));
  const buttonElement = formElement.querySelector(validConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validConfig);
      toggleButtonState(inputList, buttonElement, validConfig);
    });
  });
};

function enableValidation(validConfig) {
  const formList = Array.from(document.querySelectorAll(validConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validConfig);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState(inputList, buttonElement, validConfig) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement);
  } else {
    buttonElement.classList.remove(validConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
  }
};

function disableSubmitButton(button) {
  button.setAttribute('disabled', true);
  button.classList.add('popup__save-button_inactive');
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});