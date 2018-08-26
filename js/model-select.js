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