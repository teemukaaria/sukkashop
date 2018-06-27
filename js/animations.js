
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