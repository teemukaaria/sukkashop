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