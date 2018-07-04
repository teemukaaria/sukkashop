(function() {
  // Set all event listeners for controlling custom drobpown behaviour
  const dropdowns = document.getElementsByClassName('dropdown');
  for (var i = 0; i < dropdowns.length; i++) {
    const dropdown = dropdowns[i];
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
    for (var i = 0; i < dropdownItems.length; i++) {
      dropdownItems[i].onclick = function() {
        // clicked item is a new option
        if (!this.classList.contains('dropdown__item--selected')) {
          const currentSelected = dropdownContent.getElementsByClassName('dropdown__item--selected');
          currentSelected[0].classList.remove('dropdown__item--selected');
          this.classList.add('dropdown__item--selected');
          dropdownContent.blur();
        }
        // item is already selected option so close or open the dropdown
        else if (dropdownContent.classList.contains('dropdown__content--open')) {
          dropdownContent.blur();
        } else {
          dropdownContent.classList.add('dropdown__content--open');
        }
      };
    }
  }

})();