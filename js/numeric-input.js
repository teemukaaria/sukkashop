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