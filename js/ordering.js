// reads the selected values from the form and creates a mailto
function order() {
  // read values from DOM
  const model = document.getElementById('ordering-model').getElementsByClassName('img-select__option--first')[0];
  const modelName = model.getElementsByClassName('img-select__option-text')[0].innerHTML;
  const primaryColor = document.getElementById('ordering-primary-color').getElementsByClassName('dropdown__item--selected')[0];
  const primaryColorName = primaryColor.getElementsByClassName('color-select__label')[0].innerHTML;
  const secondaryColor = document.getElementById('ordering-secondary-color').getElementsByClassName('dropdown__item--selected')[0];
  const secondaryColorName = secondaryColor.getElementsByClassName('color-select__label')[0].innerHTML;
  const size = document.getElementById('ordering-size').getElementsByClassName('numeric-input__value')[0].innerHTML;
  const length = document.getElementById('ordering-length').getElementsByClassName('dropdown__item--selected')[0].innerHTML;
  const message = document.getElementById('ordering-message').value;
  const secondaryIsDisabled = document.getElementsByClassName('color-select--secondary')[0].classList.contains('dropdown--disabled');

  // construct email
  let body = "Malli: " + modelName;
  body += "%0APääväri: " + primaryColorName;
  if (!secondaryIsDisabled) body += "%0AKorosteväri: " + secondaryColorName;
  body += "%0AKoko: " + size;
  body += "%0AVarsi: " + length;
  body += "%0A" + message + "%0A";

  // alert if wasn't able to read all necessary values else send mail
  if (modelName === undefined || primaryColorName === undefined || (!secondaryIsDisabled && secondaryColorName === undefined) || size === undefined || length === undefined || message === undefined) alert("Virhe lukiessa tilausta!\n" + body);
  else {
    const mailtoLink = "mailto:teemu.kaaria@gmail.com?subject=Sukkia!&body=" + body;
    window.location.href = mailtoLink;
  }

}