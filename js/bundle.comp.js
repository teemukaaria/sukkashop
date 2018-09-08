'use strict';

// animate feature-boxes and notice to view when scrolled into view
window.onscroll = function () {
    var windowOffset = window.pageYOffset + window.innerHeight;
    var features = document.getElementsByClassName('feature');
    var stillAnimationsLeft = false;
    for (var i = 0; i < features.length; i++) {
        var feature = features[i];
        var featureOffset = feature.offsetTop + feature.offsetHeight;
        var featureClasses = feature.classList;
        if (!featureClasses.contains('feature--visible')) {
            stillAnimationsLeft = true;
            // if scrolled to the view and doesn't jet have the visible class, add that
            if (featureOffset <= windowOffset) {
                featureClasses.add('feature--visible');
            }
        }
    }
    // check if delivery-notice is scrolled to view
    var notice = document.getElementById('delivery-notice');
    var noticeOffset = notice.offsetTop;
    var noticeClasses = notice.classList;
    if (!noticeClasses.contains('notice--visible')) {
        stillAnimationsLeft = true;
        if (noticeOffset <= windowOffset) {
            noticeClasses.add('notice--visible');
        }
    }
    // if no more features hidden, remove the onscroll function
    if (!stillAnimationsLeft) {
        window.onscroll = function () {};
    }
};
//(function() {
// Set all event listeners for controlling custom drobpown behaviour
var dropdowns = document.getElementsByClassName('dropdown');

var _loop = function _loop() {
    var dropdown = dropdowns[i];
    if (dropdown.classList.contains('dropdown--disabled')) return 'continue';
    var dropdownContent = dropdown.getElementsByClassName('dropdown__content')[0];
    // Unset the open flag when focus is lost
    dropdownContent.onblur = function () {
        this.classList.remove('dropdown__content--open');
    };
    var dropdownArrow = dropdown.getElementsByClassName('dropdown__arrow')[0];
    // open or close dropdown
    dropdownArrow.onclick = function () {
        // if dropdown is open
        if (dropdownContent.classList.contains('dropdown__content--open')) {
            dropdownContent.blur();
        }
        // or its closed
        else {
                dropdownContent.classList.add('dropdown__content--open');
            }
    };
    var dropdownItems = dropdownContent.getElementsByClassName('dropdown__item');
    for (j = 0; j < dropdownItems.length; j++) {
        dropdownItems[j].onclick = function () {
            var currentSelected = dropdownContent.getElementsByClassName('dropdown__item--selected');
            currentSelected[0].classList.remove('dropdown__item--selected');
            this.classList.add('dropdown__item--selected');
            dropdownContent.blur();
        };
    }
};

for (var i = 0; i < dropdowns.length; i++) {
    var j;

    var _ret = _loop();

    if (_ret === 'continue') continue;
}
//})();
// save offsets for all img-selectes
var selectOffset = [];
(function () {
    // add functionality to all img-select elements
    var selects = document.getElementsByClassName('img-select');

    var _loop2 = function _loop2() {
        var select = selects[i];
        // set initial offset to 0
        selectOffset[i] = 0;
        var arrow = select.getElementsByClassName('img-select__arrow')[0];
        var index = i;
        arrow.onclick = function () {
            var options = select.getElementsByClassName('img-select__option');
            // move current first to hidden
            var first = select.getElementsByClassName('img-select__option--first')[0];
            first.classList.remove('img-select__option--first');
            first.classList.add('img-select__option--hidden');
            // move current second to first
            var second = select.getElementsByClassName('img-select__option--second')[0];
            second.classList.remove('img-select__option--second');
            second.classList.add('img-select__option--first');
            // take next upcoming hidden
            var hidden = second.nextElementSibling;
            // if we don't have anymore upcoming hidden elements take the first element
            if (!hidden.classList.contains('img-select__option')) {
                hidden = select.getElementsByClassName('img-select__option')[0];
            }
            // move next upcoming hidden to second
            hidden.classList.remove('img-select__option--hidden');
            hidden.classList.add('img-select__option--second');
            selectOffset[index]++;
        };
    };

    for (var i = 0; i < selects.length; i++) {
        _loop2();
    }
})();
// Add functionality to changing selected sock model
function checkSecondaryColorAvailability(ordering) {
    var first = ordering.getElementsByClassName("img-select__option--first")[0];
    var secondaryColorSelect = ordering.getElementsByClassName("color-select--secondary")[0];
    var secondary = first.getAttribute("secondary");
    if (secondary === "enable") {
        secondaryColorSelect.classList.remove("dropdown--disabled");
    } else {
        secondaryColorSelect.classList.add("dropdown--disabled");
    }
}
(function () {
    var ordering = document.getElementById("ordering");
    checkSecondaryColorAvailability(ordering);
    var arrow = ordering.getElementsByClassName("img-select__arrow")[0];
    arrow.addEventListener("click", function () {
        checkSecondaryColorAvailability(ordering);
    });
})();
var inputValues = [];

function numericInputStepUp(i, step, valueElem, max) {
    var current = inputValues[i];
    if (current + step <= max) inputValues[i] += step;
    valueElem.innerHTML = inputValues[i];
}

function numericInputStepDown(i, step, valueElem, min) {
    var current = inputValues[i];
    if (current - step >= min) inputValues[i] -= step;
    valueElem.innerHTML = inputValues[i];
}

function numericInputCalcTop(i, min, max, valueElem) {
    var gap = max - min;
    var over = inputValues[i] - min;
    var top = (gap - over) * 100.0 / gap;
    valueElem.style.top = top + "%";
}
(function () {
    var numericInputs = document.getElementsByClassName('numeric-input');

    var _loop3 = function _loop3() {
        var input = numericInputs[i];
        var def = parseFloat(input.getAttribute('default'));
        var min = parseFloat(input.getAttribute('min'));
        var max = parseFloat(input.getAttribute('max'));
        var step = parseFloat(input.getAttribute('step'));
        var index = i;
        inputValues[i] = def;
        var valueElem = input.getElementsByClassName('numeric-input__value')[0];
        valueElem.innerHTML = def;
        input.onkeydown = function (e) {
            if (e.keyCode == 40 || e.keyCode == 38) e.preventDefault();
            if (e.keyCode == 40) numericInputStepDown(index, step, valueElem, min);else if (e.keyCode == 38) numericInputStepUp(index, step, valueElem, max);
            numericInputCalcTop(index, min, max, valueElem);
        };
        var upArrow = input.getElementsByClassName('numeric-input__arrow--up')[0];
        upArrow.onclick = function () {
            numericInputStepUp(index, step, valueElem, max);
            numericInputCalcTop(index, min, max, valueElem);
        };
        var downArrow = input.getElementsByClassName('numeric-input__arrow--down')[0];
        downArrow.onclick = function () {
            numericInputStepDown(index, step, valueElem, min);
            numericInputCalcTop(index, min, max, valueElem);
        };
        var content = input.getElementsByClassName('numeric-input__content')[0];
        content.onfocus = function () {
            numericInputCalcTop(index, min, max, valueElem);
        };
        content.onblur = function () {
            this.classList.remove('numeric-input__content--open');
            valueElem.style.top = "0";
        };
        var valueBox = input.getElementsByClassName('numeric-input__value-box')[0];
        valueBox.onclick = function () {
            if (content.classList.contains('numeric-input__content--open')) {
                content.blur();
            } else {
                content.classList.add('numeric-input__content--open');
            }
        };
        var arrowBox = input.getElementsByClassName('numeric-input__arrow-box')[0];
        arrowBox.onclick = function () {
            if (!content.classList.contains('numeric-input__content--open')) {
                content.classList.add('numeric-input__content--open');
            }
        };
    };

    for (var i = 0; i < numericInputs.length; i++) {
        _loop3();
    }
})();
// reads the selected values from the form and creates a mailto
function order() {
    // read values from DOM
    var model = document.getElementById('ordering-model').getElementsByClassName('img-select__option--first')[0];
    var modelName = model.getElementsByClassName('img-select__option-text')[0].innerHTML;
    var primaryColor = document.getElementById('ordering-primary-color').getElementsByClassName('dropdown__item--selected')[0];
    var primaryColorName = primaryColor.getElementsByClassName('color-select__label')[0].innerHTML;
    var secondaryColor = document.getElementById('ordering-secondary-color').getElementsByClassName('dropdown__item--selected')[0];
    var secondaryColorName = secondaryColor.getElementsByClassName('color-select__label')[0].innerHTML;
    var size = document.getElementById('ordering-size').getElementsByClassName('numeric-input__value')[0].innerHTML;
    var length = document.getElementById('ordering-length').getElementsByClassName('dropdown__item--selected')[0].innerHTML;
    var message = document.getElementById('ordering-message').value;
    var secondaryIsDisabled = document.getElementsByClassName('color-select--secondary')[0].classList.contains('dropdown--disabled');
    // construct email
    var body = "Malli: " + modelName;
    body += "%0APääväri: " + primaryColorName;
    if (!secondaryIsDisabled) body += "%0AKorosteväri: " + secondaryColorName;
    body += "%0AKoko: " + size;
    body += "%0AVarsi: " + length;
    body += "%0A" + message + "%0A";
    // alert if wasn't able to read all necessary values else send mail
    if (modelName === undefined || primaryColorName === undefined || !secondaryIsDisabled && secondaryColorName === undefined || size === undefined || length === undefined || message === undefined) alert("Virhe lukiessa tilausta!\n" + body);else {
        var mailtoLink = "mailto:teemu.kaaria@gmail.com?subject=Sukkia!&body=" + body;
        window.location.href = mailtoLink;
    }
}
