let clickCount = 0;
let lastClickTime = 0;

document.querySelector('.DagPlayOpt').addEventListener('click', function() {
  const currentTime = new Date().getTime();

  if (clickCount < 3 && currentTime - lastClickTime > 1800000) { // Check if less than 3 clicks and more than 30 minutes since the last click
    window.open('https://slippersprimeexaltation.com/du3zr4sht2?key=2cbd96ee416e98cace4a8cb57449ac61', '_blank');
    clickCount++;
    lastClickTime = currentTime;
  } else {
    // Reset click count after 30 minutes
    if (currentTime - lastClickTime > 1800000) {
      clickCount = 0;
      lastClickTime = currentTime;
    }
  }
});
