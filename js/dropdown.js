(function() {
  // Set all event listeners for controlling custom drobpown behaviour
  const dropdowns = document.getElementsByClassName('dropdown');
  for (var i = 0; i < dropdowns.length; i++) {
    const dropdown = dropdowns[i];
    if (dropdown.classList.contains('dropdown--disabled')) continue;
    const dropdownContent =  dropdown.getElementsByClassName('dropdown__content')[0];
    // Unset the open flag when focus is lost
    dropdownContent.onblur = function() {
      this.classList.remove('dropdown__content--open');
    }
    const dropdownArrow =  dropdown.getElementsByClassName('dropdown__arrow')[0];
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

})();