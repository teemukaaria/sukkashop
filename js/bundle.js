// animate feature-boxes and notice to view when scrolled into view
window.onscroll = function() {
    const windowOffset = window.pageYOffset + window.innerHeight;
    const features = document.getElementsByClassName('feature');
    let stillAnimationsLeft = false;
    for (var i = 0; i < features.length; i++) {
        const feature = features[i];
        const featureOffset = feature.offsetTop + feature.offsetHeight;
        const featureClasses = feature.classList;
        if (!featureClasses.contains('feature--visible')) {
            stillAnimationsLeft = true;
            // if scrolled to the view and doesn't jet have the visible class, add that
            if (featureOffset <= windowOffset) {
                featureClasses.add('feature--visible');
            }
        }
    }
    // check if delivery-notice is scrolled to view
    const notice = document.getElementById('delivery-notice');
    const noticeOffset = notice.offsetTop;
    const noticeClasses = notice.classList;
    if (!noticeClasses.contains('notice--visible')) {
        stillAnimationsLeft = true;
        if (noticeOffset <= windowOffset) {
            noticeClasses.add('notice--visible');
        }
    }
    // if no more features hidden, remove the onscroll function
    if (!stillAnimationsLeft) {
        window.onscroll = function() {}
    }
}
//(function() {
// Set all event listeners for controlling custom drobpown behaviour
const dropdowns = document.getElementsByClassName('dropdown');
for (var i = 0; i < dropdowns.length; i++) {
    const dropdown = dropdowns[i];
    if (dropdown.classList.contains('dropdown--disabled')) continue;
    const dropdownContent = dropdown.getElementsByClassName('dropdown__content')[0];
    // Unset the open flag when focus is lost
    dropdownContent.onblur = function() {
        this.classList.remove('dropdown__content--open');
    }
    const dropdownArrow = dropdown.getElementsByClassName('dropdown__arrow')[0];
    // open or close dropdown
    dropdownArrow.onclick = function() {
        // if dropdown is open
        if (dropdownContent.classList.contains('dropdown__content--open')) {
            dropdownContent.blur();
        }
        // or its closed
        else {
            dropdownContent.classList.add('dropdown__content--open');
        }
    }
    const dropdownItems = dropdownContent.getElementsByClassName('dropdown__item');
    for (var j = 0; j < dropdownItems.length; j++) {
        dropdownItems[j].onclick = function() {
            const currentSelected = dropdownContent.getElementsByClassName('dropdown__item--selected');
            currentSelected[0].classList.remove('dropdown__item--selected');
            this.classList.add('dropdown__item--selected');
            dropdownContent.blur();
        };
    }
}
//})();
// save offsets for all img-selectes
const selectOffset = [];
(function() {
    // add functionality to all img-select elements
    const selects = document.getElementsByClassName('img-select');
    for (var i = 0; i < selects.length; i++) {
        const select = selects[i];
        // set initial offset to 0
        selectOffset[i] = 0;
        const arrow = select.getElementsByClassName('img-select__arrow')[0];
        const index = i;
        arrow.onclick = function() {
            const options = select.getElementsByClassName('img-select__option');
            // move current first to hidden
            const first = select.getElementsByClassName('img-select__option--first')[0];
            first.classList.remove('img-select__option--first');
            first.classList.add('img-select__option--hidden');
            // move current second to first
            const second = select.getElementsByClassName('img-select__option--second')[0];
            second.classList.remove('img-select__option--second');
            second.classList.add('img-select__option--first');
            // take next upcoming hidden
            let hidden = second.nextElementSibling;
            // if we don't have anymore upcoming hidden elements take the first element
            if (!hidden.classList.contains('img-select__option')) {
                hidden = select.getElementsByClassName('img-select__option')[0];
            }
            // move next upcoming hidden to second
            hidden.classList.remove('img-select__option--hidden');
            hidden.classList.add('img-select__option--second');
            selectOffset[index]++;
        }
    }
})();
// Add functionality to changing selected sock model
function checkSecondaryColorAvailability(ordering) {
    const first = ordering.getElementsByClassName("img-select__option--first")[0];
    const secondaryColorSelect = ordering.getElementsByClassName("color-select--secondary")[0];
    const secondary = first.getAttribute("secondary");
    if (secondary === "enable") {
        secondaryColorSelect.classList.remove("dropdown--disabled");
    } else {
        secondaryColorSelect.classList.add("dropdown--disabled");
    }
}
(function() {
    const ordering = document.getElementById("ordering");
    checkSecondaryColorAvailability(ordering);
    const arrow = ordering.getElementsByClassName("img-select__arrow")[0];
    arrow.addEventListener("click", function() {
        checkSecondaryColorAvailability(ordering);
    });
})();
const inputValues = [];

function numericInputStepUp(i, step, valueElem, max) {
    const current = inputValues[i];
    if (current + step <= max) inputValues[i] += step;
    valueElem.innerHTML = inputValues[i];
}

function numericInputStepDown(i, step, valueElem, min) {
    const current = inputValues[i];
    if (current - step >= min) inputValues[i] -= step;
    valueElem.innerHTML = inputValues[i];
}

function numericInputCalcTop(i, min, max, valueElem) {
    const gap = max - min;
    const over = inputValues[i] - min;
    const top = (gap - over) * 100.0 / gap;
    valueElem.style.top = top + "%";
}
(function() {
    const numericInputs = document.getElementsByClassName('numeric-input');
    for (var i = 0; i < numericInputs.length; i++) {
        const input = numericInputs[i];
        const def = parseFloat(input.getAttribute('default'));
        const min = parseFloat(input.getAttribute('min'));
        const max = parseFloat(input.getAttribute('max'));
        const step = parseFloat(input.getAttribute('step'));
        const index = i;
        inputValues[i] = def;
        const valueElem = input.getElementsByClassName('numeric-input__value')[0];
        valueElem.innerHTML = def;
        input.onkeydown = function(e) {
            if (e.keyCode == 40 || e.keyCode == 38) e.preventDefault();
            if (e.keyCode == 40) numericInputStepDown(index, step, valueElem, min);
            else if (e.keyCode == 38) numericInputStepUp(index, step, valueElem, max);
            numericInputCalcTop(index, min, max, valueElem);
        }
        const upArrow = input.getElementsByClassName('numeric-input__arrow--up')[0];
        upArrow.onclick = function() {
            numericInputStepUp(index, step, valueElem, max);
            numericInputCalcTop(index, min, max, valueElem);
        }
        const downArrow = input.getElementsByClassName('numeric-input__arrow--down')[0];
        downArrow.onclick = function() {
            numericInputStepDown(index, step, valueElem, min);
            numericInputCalcTop(index, min, max, valueElem);
        }
        const content = input.getElementsByClassName('numeric-input__content')[0];
        content.onfocus = function() {
            numericInputCalcTop(index, min, max, valueElem);
        }
        content.onblur = function() {
            this.classList.remove('numeric-input__content--open');
            valueElem.style.top = "0";
        }
        const valueBox = input.getElementsByClassName('numeric-input__value-box')[0];
        valueBox.onclick = function() {
            if (content.classList.contains('numeric-input__content--open')) {
                content.blur();
            } else {
                content.classList.add('numeric-input__content--open');
            }
        }
        const arrowBox = input.getElementsByClassName('numeric-input__arrow-box')[0];
        arrowBox.onclick = function() {
            if (!content.classList.contains('numeric-input__content--open')) {
                content.classList.add('numeric-input__content--open');
            }
        }
    }
})();
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
